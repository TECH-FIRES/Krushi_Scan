import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import SensorData from '@/models/SensorData'
import { generateAlertsForReading } from '@/lib/alerting'

type HardwarePayload = {
  soil?: number
  soil_moisture?: number
  air?: number
  temperature?: number
  hum?: number
  humidity?: number
  water?: number
  water_temperature?: number
  ph?: number
  device_id?: string
}

const parseNumber = (value: unknown): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let payload: HardwarePayload

    if (contentType.includes('application/json')) {
      payload = await request.json()
    } else {
      const url = new URL(request.url)
      payload = {
        soil: url.searchParams.get('soil') || undefined,
        air: url.searchParams.get('air') || undefined,
        hum: url.searchParams.get('hum') || undefined,
        water: url.searchParams.get('water') || undefined,
        ph: url.searchParams.get('ph') || undefined,
        device_id: url.searchParams.get('device_id') || undefined,
      }
    }

    const soil = parseNumber(payload.soil_moisture ?? payload.soil)
    const air = parseNumber(payload.temperature ?? payload.air)
    const hum = parseNumber(payload.humidity ?? payload.hum)
    const water = parseNumber(payload.water_temperature ?? payload.water)
    const ph = parseNumber(payload.ph)

    if (soil === null || air === null || hum === null || water === null) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required sensor data. Required: soil/soil_moisture, air/temperature, hum/humidity, water/water_temperature',
        },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const deviceId = payload.device_id || 'ESP32_MAIN_NODE'
    
    const sensorData = {
      device_id: deviceId,
      soil_moisture: soil,
      temperature: air,
      humidity: hum,
      water_temperature: water,
      ph: ph ?? 7,
    }

    const created = await SensorData.create(sensorData)

    await generateAlertsForReading({
      soil_moisture: created.soil_moisture,
      temperature: created.temperature,
      humidity: created.humidity,
      water_temperature: created.water_temperature,
    })

    return NextResponse.json({
      success: true,
      message: 'Hardware data received and stored',
      data: {
        id: created._id,
        device_id: created.device_id,
        soil_moisture: created.soil_moisture,
        temperature: created.temperature,
        humidity: created.humidity,
        water_temperature: created.water_temperature,
        ph: created.ph,
        timestamp: created.timestamp,
      },
    })
  } catch (error: any) {
    console.error('[hardware/ingest] Error:', error.message)
    return NextResponse.json(
      { success: false, error: 'Failed to process hardware data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const deviceId = url.searchParams.get('device_id')

    const query = deviceId ? { device_id: deviceId } : {}
    
    const data = await SensorData.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      count: data.length,
      data: data,
    })
  } catch (error: any) {
    console.error('[hardware/ingest][GET] Error:', error.message)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hardware data' },
      { status: 500 }
    )
  }
}
