import mongoose from 'mongoose'

const ScanReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  disease: { type: String, required: true },
  confidence: { type: Number, required: true },
  treatment: { type: String, required: true },
  prediction: { type: String },
  crop: { type: String },
  imageUrl: { type: String },
  scanType: { type: String, enum: ['disease', 'crop-identification'], default: 'disease' },
  recommended_crops: [{ 
    crop: String, 
    score: Number 
  }],
  top5_predictions: [{
    class: String,
    confidence: Number
  }],
  createdAt: { type: Date, default: Date.now },
})

ScanReportSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.models.ScanReport || mongoose.model('ScanReport', ScanReportSchema)
