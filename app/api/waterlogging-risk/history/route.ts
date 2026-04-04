import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import WaterloggingRisk from '@/models/WaterloggingRisk'

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    const limit = parseInt(searchParams.get('limit') || '100')

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Fetch waterlogging history
    const history = await WaterloggingRisk.find({
      created_at: { $gte: startDate },
    })
      .sort({ created_at: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({
      data: history,
      count: history.length,
      timeRange: `Last ${days} days`,
    })
  } catch (error) {
    console.error('Waterlogging history fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waterlogging history' },
      { status: 500 }
    )
  }
}
