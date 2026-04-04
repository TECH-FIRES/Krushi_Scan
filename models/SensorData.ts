import mongoose from 'mongoose'

const SensorDataSchema = new mongoose.Schema({
  device_id: { type: String, required: true, default: 'ESP32_MAIN_NODE' },
  soil_moisture: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  water_temperature: { type: Number, required: true },
  ph: { type: Number, default: 7 },
  timestamp: { type: Date, default: Date.now },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
})

// Prevent recompilation of model during hot reloads
export default mongoose.models.SensorData || mongoose.model('SensorData', SensorDataSchema)
