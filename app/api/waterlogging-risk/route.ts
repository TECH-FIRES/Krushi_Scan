import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import SensorData from '@/models/SensorData'
import WaterloggingRisk from '@/models/WaterloggingRisk'
import { calculateWaterloggingRisk } from '@/lib/waterlogging'

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    // Get the latest sensor data
    const sensorData = await SensorData.findOne().sort({ timestamp: -1 }).lean()

    if (!sensorData) {
      return NextResponse.json(
        { error: 'No sensor data available' },
        { status: 404 }
      )
    }

    const deviceId = sensorData.device_id || 'ESP32_MAIN_NODE'

    // Calculate waterlogging risk
    const riskAssessment = calculateWaterloggingRisk({
      soil_moisture: sensorData.soil_moisture,
      humidity: sensorData.humidity,
      temperature: sensorData.temperature,
      device_id: deviceId,
    })

    // Store in waterlogging_risk collection
    const waterloggingRecord = new WaterloggingRisk({
      device_id: deviceId,
      soil_moisture: sensorData.soil_moisture,
      humidity: sensorData.humidity,
      temperature: sensorData.temperature,
      risk_level: riskAssessment.risk_level,
      soil_status: riskAssessment.soil_status,
      recommendation: riskAssessment.recommendation,
      crop_risk: riskAssessment.crop_risk,
      drainage_suggestion: riskAssessment.drainage_suggestion,
    })

    await waterloggingRecord.save()

    // Return response
    const response = {
      risk_level: riskAssessment.risk_level,
      risk_score: riskAssessment.score,
      soil_status: riskAssessment.soil_status,
      recommendation: riskAssessment.recommendation,
      crop_risk: riskAssessment.crop_risk,
      drainage_suggestion: riskAssessment.drainage_suggestion,
      soil_moisture: sensorData.soil_moisture,
      humidity: sensorData.humidity,
      temperature: sensorData.temperature,
      device_id: deviceId,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Waterlogging risk calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate waterlogging risk' },
      { status: 500 }
    )
  }
}
