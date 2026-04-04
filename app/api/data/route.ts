import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import SensorData from '@/models/SensorData'
import { generateAlertsForReading } from '@/lib/alerting'

const INGEST_INTERVAL_MS = 5_000

const parseNumber = (value: string | null): number | null => {
  if (value === null || value.trim() === '') {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

// Flask-like endpoint:
// /api/data?soil=45&air=28&hum=61&water=24
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams

    const soil = parseNumber(params.get('soil') ?? params.get('soil_moisture'))
    const air = parseNumber(params.get('air') ?? params.get('temperature'))
    const hum = parseNumber(params.get('hum') ?? params.get('humidity'))
    const water = parseNumber(params.get('water') ?? params.get('water_temperature'))
    const ph = parseNumber(params.get('ph'))
    const device_id = params.get('device_id') || 'ESP32_MAIN_NODE'

    if (soil === null || air === null || hum === null || water === null) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid query params. Required: soil, air, hum, water.',
        },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const latestForDevice = await SensorData.findOne({ device_id }).sort({ timestamp: -1 }).lean()
    if (latestForDevice?.timestamp) {
      const elapsedMs = Date.now() - new Date(latestForDevice.timestamp).getTime()
      if (elapsedMs < INGEST_INTERVAL_MS) {
        return NextResponse.json(
          {
            success: true,
            message: 'Skipped: sensor data is accepted once every 5 seconds',
            next_allowed_in_ms: INGEST_INTERVAL_MS - elapsedMs,
          },
          { status: 200 }
        )
      }
    }

    const created = await SensorData.create({
      device_id,
      soil_moisture: soil,
      temperature: air,
      humidity: hum,
      water_temperature: water,
      ...(ph !== null ? { ph } : {}),
    })

    await generateAlertsForReading({
      soil_moisture: created.soil_moisture,
      temperature: created.temperature,
      humidity: created.humidity,
      water_temperature: created.water_temperature,
    })

    return NextResponse.json({
      success: true,
      message: 'OK',
      data: {
        soil: created.soil_moisture,
        air: created.temperature,
        hum: created.humidity,
        water: created.water_temperature,
        timestamp: created.timestamp,
      },
    })
  } catch (error) {
    console.error('[data][GET] Failed to save sensor data', error)
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 })
  }
}
