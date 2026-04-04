import { NextResponse } from 'next/server'

// Regional Intelligence Database
const regionDb: Record<string, any> = {
  karnataka: {
    crops: ['Ragi', 'Coffee', 'Arecanut', 'Sugarcane', 'Cotton'],
    diseases: ['Leaf Rust', 'Blast', 'Wilt'],
    soil_type: ['Red Soil', 'Laterite', 'Black Soil'],
    weather_trend: 'Humid & Tropical',
    recommendation: 'Use drip irrigation for Arecanut. Watch for Leaf Rust during monsoons.'
  },
  punjab: {
    crops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane'],
    diseases: ['Yellow Rust', 'Karnal Bunt', 'Sheath Blight'],
    soil_type: ['Alluvial', 'Loamy'],
    weather_trend: 'Semi-arid, High Heat Summer',
    recommendation: 'Monitor water levels for Rice. Prevent early stage fungal infections.'
  },
  maharashtra: {
    crops: ['Cotton', 'Soybean', 'Onion', 'Jowar'],
    diseases: ['Pink Bollworm', 'Leaf Spot'],
    soil_type: ['Black Cotton Soil'],
    weather_trend: 'Tropical, erratic monsoon',
    recommendation: 'Deep ploughing recommended to expose pupae.'
  },
  default: {
    crops: ['Corn', 'Tomato', 'Potato'],
    diseases: ['Early Blight', 'Late Blight'],
    soil_type: ['Mixed'],
    weather_trend: 'Standard',
    recommendation: 'Maintain standard NPK ratios. Ensure proper drainage.'
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get('state')?.toLowerCase()

  if (state && regionDb[state]) {
    return NextResponse.json(regionDb[state])
  }

  // Return all regions if no specific state requested
  return NextResponse.json({
    karnataka: regionDb.karnataka,
    punjab: regionDb.punjab,
    maharashtra: regionDb.maharashtra
  })
}
