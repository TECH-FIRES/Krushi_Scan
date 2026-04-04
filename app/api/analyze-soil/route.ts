import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { nitrogen, phosphorus, potassium, ph, moisture, temperature } = data

    // Mock ML logic for Hackathon demo
    // Wait for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let fertilizer = ''
    let irrigation = ''
    let risk = ''

    // Fertilizer Mock Logic
    if (nitrogen < 50) {
      fertilizer = 'High Urea (46-0-0) required. Apply 50kg/acre immediately to boost vegetative growth.'
    } else if (phosphorus < 20) {
      fertilizer = 'Apply DAP (Diammonium Phosphate) or Single Super Phosphate to improve root development.'
    } else if (potassium < 40) {
      fertilizer = 'MOP (Muriate of Potash) recommended. 30kg/acre to improve drought resistance.'
    } else {
      fertilizer = 'Soil nutrients are optimal. Apply standard NPK 19:19:19 to maintain balance.'
    }

    // Irrigation Mock Logic
    if (ph < 5.5) {
      fertilizer += ' WARNING: Low pH detected. Add agricultural lime.'
    } else if (ph > 7.5) {
      fertilizer += ' WARNING: High pH detected. Add elemental sulfur.'
    }

    if (moisture < 30) {
      irrigation = 'CRITICAL: Soil moisture is below 30%. Immediate drip irrigation recommended for 4 hours.'
    } else if (moisture > 70) {
      irrigation = 'WARNING: Waterlogging risk. Halt irrigation for next 48 hours to prevent root rot.'
    } else {
      irrigation = 'OPTIMAL: Moisture levels are good. Maintain current schedule (2 hours every alternate day).'
    }

    // Risk Analysis Mock
    if (temperature > 30 && humidity(data.humidity) > 70) {
      risk = 'HIGH RISK of Fungal Infections (like Rust or Blight) due to high temp and humidity. Pre-emptive fungicide spray advised.'
    } else {
      risk = 'Low risk of disease. Current environmental conditions are favorable for growth.'
    }

    return NextResponse.json({
      fertilizer,
      irrigation,
      risk
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process soil data' }, { status: 500 })
  }
}

function humidity(val: any) {
    return val || 65; // fallback
}
