import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const state = formData.get('state') as string
    const district = formData.get('district') as string

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer])
    
    const aiFormData = new FormData()
    aiFormData.append('image', blob, file.name)
    if (state) aiFormData.append('state', state)
    if (district) aiFormData.append('district', district)

    const response = await axios.post(`${AI_SERVICE_URL}/predict`, aiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    })

    return NextResponse.json({
      success: true,
      prediction: response.data.prediction,
      disease: response.data.disease,
      confidence: response.data.confidence,
      treatment: response.data.treatment,
      recommended_crops: response.data.recommended_crops,
      top5_predictions: response.data.top5_predictions,
    })
  } catch (error: any) {
    console.error('[ai-predict] Error:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          error: 'AI service unavailable. Please ensure the AI service is running.',
          fallback: true 
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process image prediction' },
      { status: 500 }
    )
  }
}
