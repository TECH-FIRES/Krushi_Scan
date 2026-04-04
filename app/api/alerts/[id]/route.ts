import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb'
import Alert from '@/models/Alert'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const { id } = await context.params

    await connectToDatabase()
    const deleted = await Alert.findOneAndDelete({ _id: id, userId: decoded.userId })

    if (!deleted) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Alert deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete alert' }, { status: 500 })
  }
}
