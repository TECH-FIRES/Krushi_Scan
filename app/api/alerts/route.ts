import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb'
import Alert from '@/models/Alert'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    await connectToDatabase()

    const alerts = await Alert.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()

    return NextResponse.json({
      success: true,
      alerts: alerts.map((alert: any) => ({
        id: String(alert._id),
        type: alert.type,
        message: alert.message,
        timestamp: alert.createdAt,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
