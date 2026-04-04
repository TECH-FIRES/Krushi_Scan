import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import Alert from '@/models/Alert'

type SensorInput = {
  soil_moisture: number
  temperature: number
  humidity: number
  water_temperature: number
}

type AlertCandidate = {
  type: 'warning' | 'critical' | 'info'
  message: string
  sensorKey: string
  sensorValue: number
  threshold: number
}

const DEDUPE_WINDOW_MS = 10 * 60 * 1000

const evaluateThresholds = (sensor: SensorInput): AlertCandidate[] => {
  const candidates: AlertCandidate[] = []
  const LOW_THRESHOLD = 30

  if (sensor.soil_moisture < LOW_THRESHOLD) {
    candidates.push({
      type: sensor.soil_moisture < 20 ? 'critical' : 'warning',
      message: `Low soil moisture detected (${sensor.soil_moisture.toFixed(1)}%).`,
      sensorKey: 'soil_moisture',
      sensorValue: sensor.soil_moisture,
      threshold: LOW_THRESHOLD,
    })
  }

  if (sensor.temperature > 35) {
    candidates.push({
      type: sensor.temperature > 40 ? 'critical' : 'warning',
      message: `High ambient temperature detected (${sensor.temperature.toFixed(1)}°C).`,
      sensorKey: 'temperature',
      sensorValue: sensor.temperature,
      threshold: 35,
    })
  }

  if (sensor.humidity < LOW_THRESHOLD) {
    candidates.push({
      type: 'warning',
      message: `Low humidity detected (${sensor.humidity.toFixed(1)}%).`,
      sensorKey: 'humidity',
      sensorValue: sensor.humidity,
      threshold: LOW_THRESHOLD,
    })
  }

  if (sensor.water_temperature < LOW_THRESHOLD) {
    candidates.push({
      type: 'warning',
      message: `Low water temperature detected (${sensor.water_temperature.toFixed(1)}°C).`,
      sensorKey: 'water_temperature',
      sensorValue: sensor.water_temperature,
      threshold: LOW_THRESHOLD,
    })
  }

  return candidates
}

const sendAlertEmail = async (email: string, name: string | undefined, message: string) => {
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (!emailUser || !emailPass) {
    return false
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  })

  await transporter.sendMail({
    from: emailUser,
    to: email,
    subject: 'Krushi Scan Alert Notification',
    text: `Hello ${name || 'Farmer'},\n\n${message}\n\nPlease review your dashboard for details.\n\nRegards,\nKrushi Scan Team`,
  })

  return true
}

export async function generateAlertsForReading(sensor: SensorInput) {
  const candidates = evaluateThresholds(sensor)
  if (candidates.length === 0) {
    return
  }

  const users = await mongoose.connection
    .collection('users')
    .find(
      {
        $or: [
          { 'profileSettings.weatherAlerts': true },
          { 'profileSettings.weatherAlerts': { $exists: false } },
          { profileSettings: { $exists: false } },
        ],
      },
      { projection: { _id: 1, email: 1, name: 1, profileSettings: 1 } }
    )
    .toArray()

  const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS)

  for (const user of users) {
    for (const candidate of candidates) {
      const exists = await Alert.exists({
        userId: user._id,
        sensorKey: candidate.sensorKey,
        type: candidate.type,
        createdAt: { $gte: dedupeSince },
      })

      if (exists) {
        continue
      }

      let emailed = false
      if (user.profileSettings?.emailNotifications !== false && user.email) {
        try {
          emailed = await sendAlertEmail(user.email, user.name, candidate.message)
        } catch (error) {
          console.error('[alerting] Failed to send email notification', error)
        }
      }

      await Alert.create({
        userId: user._id,
        type: candidate.type,
        message: candidate.message,
        sensorKey: candidate.sensorKey,
        sensorValue: candidate.sensorValue,
        threshold: candidate.threshold,
        notifiedByEmail: emailed,
      })
    }
  }
}
