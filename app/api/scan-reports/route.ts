import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ScanReport from '@/models/ScanReport'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { disease, confidence, treatment, prediction, crop, imageUrl, scanType, recommended_crops, top5_predictions } = body

    if (!disease || confidence === undefined || !treatment) {
      return NextResponse.json(
        { error: 'Missing required fields: disease, confidence, treatment' },
        { status: 400 }
      )
    }

    // TODO: Save to database when MongoDB is connected
    // For now, just return success
    console.log('[scan-reports] Report received:', { disease, confidence, treatment })

    return NextResponse.json({
      success: true,
      message: 'Report saved successfully',
      reportId: 'mock-' + Date.now(),
    })
  } catch (error: any) {
    console.error('[scan-reports] Error:', error.message)
    return NextResponse.json(
      { error: 'Failed to save report', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // For now, use a mock userId - in production, get from session
    const mockUserId = '507f1f77bcf86cd799439011'

    const reports = await ScanReport.find({ userId: mockUserId })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json({
      success: true,
      reports,
    })
  } catch (error: any) {
    console.error('[scan-reports] Error:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
