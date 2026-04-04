import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import SensorData from '@/models/SensorData'
import { generateAlertsForReading } from '@/lib/alerting'

const FLASK_GETDATA_URL = process.env.FLASK_GETDATA_URL || 'http://127.0.0.1:5000/getdata'
const INGEST_INTERVAL_MS = 10_000

const parseNumber = (value: unknown): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const syncFromFlask = async () => {
  try {
    const response = await fetch(FLASK_GETDATA_URL, { cache: 'no-store' })
    if (!response.ok) {
      return
    }

    const flaskData = await response.json()
    const soil = parseNumber(flaskData?.soil)
    const air = parseNumber(flaskData?.air)
    const hum = parseNumber(flaskData?.hum)
    const water = parseNumber(flaskData?.water)

    if (soil === null || air === null || hum === null || water === null) {
      return
    }

    const latest = await SensorData.findOne({ device_id: 'FLASK_BRIDGE' }).sort({ timestamp: -1 }).lean()
    const isChanged =
      !latest ||
      latest.soil_moisture !== soil ||
      latest.temperature !== air ||
      latest.humidity !== hum ||
      latest.water_temperature !== water

    if (!isChanged) {
      return
    }

    if (latest?.timestamp) {
      const elapsedMs = Date.now() - new Date(latest.timestamp).getTime()
      if (elapsedMs < INGEST_INTERVAL_MS) {
        return
      }
    }

    const created = await SensorData.create({
      device_id: 'FLASK_BRIDGE',
      soil_moisture: soil,
      temperature: air,
      humidity: hum,
      water_temperature: water,
    })

    await generateAlertsForReading({
      soil_moisture: created.soil_moisture,
      temperature: created.temperature,
      humidity: created.humidity,
      water_temperature: created.water_temperature,
    })
  } catch (error) {
    console.error('[getdata][syncFromFlask] Failed to sync from Flask', error)
  }
}

// Flask-like endpoint to get latest values for dashboard polling.
export async function GET(request: NextRequest) {
  try {
    const rawLimit = Number(request.nextUrl.searchParams.get('limit') ?? '24')
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(Math.trunc(rawLimit), 1), 200) : 24

    await connectToDatabase()
    await syncFromFlask()

    const readings = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('soil_moisture temperature humidity water_temperature timestamp')
      .lean()

    const latest = readings[0]

    if (!latest) {
      return NextResponse.json({
        soil: '--',
        air: '--',
        hum: '--',
        water: '--',
        timestamp: null,
        history: [],
      })
    }

    const history = [...readings].reverse().map((item) => ({
      soil: item.soil_moisture,
      air: item.temperature,
      hum: item.humidity,
      water: item.water_temperature,
      timestamp: item.timestamp,
    }))

    return NextResponse.json({
      soil: latest.soil_moisture,
      air: latest.temperature,
      hum: latest.humidity,
      water: latest.water_temperature,
      timestamp: latest.timestamp,
      history,
    })
  } catch (error) {
    console.error('[getdata][GET] Failed to fetch latest data', error)
    return NextResponse.json(
      {
        soil: '--',
        air: '--',
        hum: '--',
        water: '--',
        timestamp: null,
        history: [],
      },
      { status: 500 }
    )
  }
}
