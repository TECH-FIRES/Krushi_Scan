/**
 * Waterlogging Detection & Prevention Logic
 * AI rule-based system for detecting waterlogging risk
 */

export interface WaterloggingReading {
  soil_moisture: number
  humidity: number
  temperature: number
  device_id: string
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface WaterloggingRiskAssessment {
  risk_level: RiskLevel
  soil_status: string
  recommendation: string
  crop_risk: string
  drainage_suggestion: string
  score: number
}

/**
 * Calculate waterlogging risk based on sensor data
 * 
 * HIGH: soil_moisture > 80 AND humidity > 75
 * MEDIUM: soil_moisture 60-80 AND humidity > 60
 * LOW: otherwise
 */
export function calculateWaterloggingRisk(reading: WaterloggingReading): WaterloggingRiskAssessment {
  const { soil_moisture, humidity, temperature } = reading
  let riskLevel: RiskLevel = 'LOW'
  let score = 0

  // Moisture score (0-50 points)
  let moistureScore = 0
  if (soil_moisture > 85) {
    moistureScore = 50
    score += 50
  } else if (soil_moisture > 80) {
    moistureScore = 45
    score += 45
  } else if (soil_moisture > 75) {
    moistureScore = 35
    score += 35
  } else if (soil_moisture > 65) {
    moistureScore = 20
    score += 20
  } else if (soil_moisture > 50) {
    moistureScore = 10
    score += 10
  }

  // Humidity score (0-50 points)
  let humidityScore = 0
  if (humidity > 85) {
    humidityScore = 50
    score += 50
  } else if (humidity > 75) {
    humidityScore = 40
    score += 40
  } else if (humidity > 65) {
    humidityScore = 25
    score += 25
  } else if (humidity > 55) {
    humidityScore = 15
    score += 15
  }

  // Temperature factor (cooler temps worsen waterlogging)
  if (temperature < 15) {
    score += 20 // Cold + wet = bad drainage
  } else if (temperature < 20) {
    score += 10
  }

  // Determine risk level and provide tailored response
  if (soil_moisture > 80 && humidity > 75) {
    riskLevel = 'HIGH'
  } else if (soil_moisture >= 60 && soil_moisture <= 80 && humidity > 60) {
    riskLevel = 'MEDIUM'
  } else {
    riskLevel = 'LOW'
  }

  // Generate soil status
  let soilStatus = 'Normal moisture levels'
  if (soil_moisture > 85) {
    soilStatus = '🌊 Water Saturated - Critical'
  } else if (soil_moisture > 80) {
    soilStatus = '💧 Heavily Waterlogged'
  } else if (soil_moisture > 75) {
    soilStatus = '⚠️ Moderately Waterlogged'
  } else if (soil_moisture > 65) {
    soilStatus = '📊 Elevated moisture'
  } else if (soil_moisture > 50) {
    soilStatus = '✅ Optimal moisture range'
  } else {
    soilStatus = '🏜️ Dry soil conditions'
  }

  // Generate recommendation
  let recommendation = 'Continue monitoring soil conditions'
  if (riskLevel === 'HIGH') {
    recommendation = '🚨 URGENT: Stop irrigation immediately and improve drainage. Check field for water accumulation.'
  } else if (riskLevel === 'MEDIUM') {
    recommendation = '⚠️ High waterlogging risk detected. Reduce irrigation and plan drainage improvements.'
  } else {
    recommendation = '✅ Good conditions. Continue regular monitoring.'
  }

  // Generate crop risk
  let cropRisk = 'Crop is safe from waterlogging'
  if (riskLevel === 'HIGH') {
    if (temperature < 20) {
      cropRisk = '🔴 CRITICAL: Root rot, fungal diseases, and nutrient loss imminent within 24-48 hours'
    } else {
      cropRisk = '🔴 HIGH: Root rot possible within 3-5 days. Fungal diseases likely.'
    }
  } else if (riskLevel === 'MEDIUM') {
    cropRisk = '🟠 MEDIUM: Root damage possible if conditions persist. Monitor daily.'
  } else {
    cropRisk = '🟢 LOW: Crop is safe from waterlogging-related damage'
  }

  // Drainage suggestions
  let drainageSuggestion = 'Maintain good soil drainage practices'
  if (riskLevel === 'HIGH') {
    drainageSuggestion = 'IMMEDIATE ACTION: Open drainage channels, use pumps if available, create furrows, avoid compost application'
  } else if (riskLevel === 'MEDIUM') {
    drainageSuggestion = 'Plan drainage: Create sub-surface drainage, improve field layout, avoid water accumulation zones'
  } else {
    drainageSuggestion = 'Maintain preventative measures: Regular drainage maintenance, monitor rainfall'
  }

  return {
    risk_level: riskLevel,
    soil_status: soilStatus,
    recommendation,
    crop_risk: cropRisk,
    drainage_suggestion: drainageSuggestion,
    score: Math.min(100, score),
  }
}

/**
 * Format risk level for display
 */
export function getRiskColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'HIGH':
      return '#ef4444' // red
    case 'MEDIUM':
      return '#f97316' // orange
    case 'LOW':
      return '#22c55e' // green
    default:
      return '#64748b' // slate
  }
}

export function getRiskBgColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'HIGH':
      return 'bg-red-50'
    case 'MEDIUM':
      return 'bg-orange-50'
    case 'LOW':
      return 'bg-green-50'
    default:
      return 'bg-slate-50'
  }
}

export function getRiskBorderColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'HIGH':
      return 'border-red-300'
    case 'MEDIUM':
      return 'border-orange-300'
    case 'LOW':
      return 'border-green-300'
    default:
      return 'border-slate-300'
  }
}

export function getRiskTextColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'HIGH':
      return 'text-red-700'
    case 'MEDIUM':
      return 'text-orange-700'
    case 'LOW':
      return 'text-green-700'
    default:
      return 'text-slate-700'
  }
}
