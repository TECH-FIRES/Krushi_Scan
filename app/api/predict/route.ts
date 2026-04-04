import { NextRequest, NextResponse } from 'next/server'

// Mock disease prediction logic
const diseaseDatabase = [
  { name: 'Early Blight', treatment: 'Apply fungicide containing mancozeb or chlorothalonil. Remove infected leaves. Ensure proper spacing for air circulation.' },
  { name: 'Late Blight', treatment: 'Use potato-specific fungicides. Improve drainage and reduce humidity. Harvest promptly to prevent spread.' },
  { name: 'Powdery Mildew', treatment: 'Spray sulfur-based fungicides. Prune affected branches. Increase air circulation and reduce humidity levels.' },
  { name: 'Leaf Spot', treatment: 'Apply copper fungicides. Remove infected leaves. Avoid overhead watering to keep leaves dry.' },
  { name: 'Healthy Leaf', treatment: 'Maintain current practices. Ensure proper watering, nutrition, and pest management.' },
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Simulate AI processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock prediction - randomly select a disease
    const prediction = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)]

    return NextResponse.json({
      disease: prediction.name,
      confidence: Math.floor(Math.random() * (98 - 72 + 1)) + 72,
      treatment: prediction.treatment,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}
