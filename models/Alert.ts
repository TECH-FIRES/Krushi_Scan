import mongoose from 'mongoose'

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['warning', 'critical', 'info'], required: true },
  message: { type: String, required: true },
  sensorKey: { type: String, required: true },
  sensorValue: { type: Number, required: true },
  threshold: { type: Number, required: true },
  notifiedByEmail: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

AlertSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema)
