import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import SensorData from '@/models/SensorData'
import { generateAlertsForReading } from '@/lib/alerting'

const INGEST_INTERVAL_MS = 10_000

type SensorPayload = {
  soil_moisture: number
  temperature: number
  humidity: number
  water_temperature: number
  ph?: number
  device_id?: string
}

const parseNumber = (value: unknown): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const normalizePayload = (raw: any): SensorPayload | null => {
  const soil = parseNumber(raw?.soil_moisture ?? raw?.soil)
  const air = parseNumber(raw?.temperature ?? raw?.air)
  const hum = parseNumber(raw?.humidity ?? raw?.hum)
  const water = parseNumber(raw?.water_temperature ?? raw?.water)
  const ph = parseNumber(raw?.ph)

  if (soil === null || air === null || hum === null || water === null) {
    return null
  }

  return {
    soil_moisture: soil,
    temperature: air,
    humidity: hum,
    water_temperature: water,
    ph: ph === null ? undefined : ph,
    device_id: raw?.device_id,
  }
}

export async function GET() {
  try {
    await connectToDatabase()
    const latest = await SensorData.findOne().sort({ timestamp: -1 }).lean()

    if (!latest) {
      return NextResponse.json({
        success: true,
        data: {
          soil_moisture: null,
          temperature: null,
          humidity: null,
          water_temperature: null,
          timestamp: null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        soil_moisture: latest.soil_moisture,
        temperature: latest.temperature,
        humidity: latest.humidity,
        water_temperature: latest.water_temperature,
        ph: latest.ph,
        timestamp: latest.timestamp,
      },
    })
  } catch (error) {
    console.error('[sensor-data][GET] Failed to fetch latest data', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch sensor data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const raw = await request.json()
    const payload = normalizePayload(raw)

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payload. Required fields: soil/soil_moisture, air/temperature, hum/humidity, water/water_temperature.',
        },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const deviceId = payload.device_id || 'ESP32_MAIN_NODE'
    const latestForDevice = await SensorData.findOne({ device_id: deviceId }).sort({ timestamp: -1 }).lean()

    if (latestForDevice?.timestamp) {
      const elapsedMs = Date.now() - new Date(latestForDevice.timestamp).getTime()
      if (elapsedMs < INGEST_INTERVAL_MS) {
        return NextResponse.json(
          {
            success: true,
            message: 'Skipped: sensor data is accepted once every 10 seconds',
            next_allowed_in_ms: INGEST_INTERVAL_MS - elapsedMs,
          },
          { status: 200 }
        )
      }
    }

    const created = await SensorData.create(payload)
    await generateAlertsForReading({
      soil_moisture: created.soil_moisture,
      temperature: created.temperature,
      humidity: created.humidity,
      water_temperature: created.water_temperature,
    })

    return NextResponse.json({
      success: true,
      message: 'Data successfully recorded',
      recorded_data: {
        soil_moisture: created.soil_moisture,
        temperature: created.temperature,
        humidity: created.humidity,
        water_temperature: created.water_temperature,
        ph: created.ph,
        timestamp: created.timestamp,
      },
    })
  } catch (error) {
    console.error('[sensor-data][POST] Failed to save data', error)
    return NextResponse.json({ success: false, error: 'Failed to process sensor data' }, { status: 400 })
  }
}
