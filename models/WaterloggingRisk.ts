import mongoose from 'mongoose'

const WaterloggingRiskSchema = new mongoose.Schema({
  device_id: { type: String, required: true, default: 'ESP32_MAIN_NODE', index: true },
  soil_moisture: { type: Number, required: true },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  risk_level: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], required: true },
  soil_status: { type: String, required: true },
  recommendation: { type: String, required: true },
  crop_risk: { type: String, required: true },
  drainage_suggestion: { type: String, default: 'Monitor soil conditions closely' },
  created_at: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now },
})

WaterloggingRiskSchema.index({ device_id: 1, created_at: -1 })
WaterloggingRiskSchema.index({ created_at: -1 })

export default mongoose.models.WaterloggingRisk || mongoose.model('WaterloggingRisk', WaterloggingRiskSchema)
