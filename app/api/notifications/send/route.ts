import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { connectToDatabase } from '@/lib/mongodb'

type NotificationPayload = {
  userId?: string
  email?: string
  subject: string
  message: string
  type?: 'alert' | 'info' | 'warning' | 'critical'
}

export async function POST(request: NextRequest) {
  try {
    const payload: NotificationPayload = await request.json()

    if (!payload.email && !payload.userId) {
      return NextResponse.json(
        { success: false, error: 'Either email or userId is required' },
        { status: 400 }
      )
    }

    let recipientEmail = payload.email

    if (payload.userId && !recipientEmail) {
      await connectToDatabase()
      const user = await (global as any).mongoose.connection
        .collection('users')
        .findOne({ _id: payload.userId }, { projection: { email: 1 } })
      
      if (!user?.email) {
        return NextResponse.json(
          { success: false, error: 'User email not found' },
          { status: 404 }
        )
      }
      recipientEmail = user.email
    }

    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 503 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    await transporter.sendMail({
      from: emailUser,
      to: recipientEmail,
      subject: payload.subject,
      text: payload.message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2D5A27; margin-bottom: 20px;">${payload.subject}</h2>
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">${payload.message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              This is an automated notification from Krushi Scan.<br>
              Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      recipient: recipientEmail,
    })
  } catch (error: any) {
    console.error('[notifications/send] Error:', error.message)
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}
