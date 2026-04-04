import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpCreatedAt: Date,
  verified: Boolean,
  createdAt: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

function generateOTP() {
  const buffer = crypto.randomBytes(3);
  const otpNum = buffer.readUIntBE(0, 3) % 1000000;
  return otpNum.toString().padStart(6, '0');
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.verified) {
    return NextResponse.json({ error: 'User already verified. Please log in.' }, { status: 400 });
  }

  const otp = generateOTP();
  const otpExpiryMinutes = 1;

  user.otp = otp;
  user.otpCreatedAt = new Date();
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Krushi Scan Signup OTP Verification',
    text: `Hello,\n\nThank you for signing up with Krushi Scan.\n\nTo complete your registration, please use the One-Time Password (OTP) below:\n\nOTP: ${otp}\n\nThis OTP is valid for the next ${otpExpiryMinutes} minute. Please do not share this code with anyone for security reasons.\n\nIf you did not request this, please ignore this email.\n\nRegards,\nKrushi Scan Team`,
    html: `
      <div style="margin:0;padding:24px;background:#f5f7f4;font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:0;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1b5e20,#43a047);padding:18px 24px;">
            <h2 style="margin:0;color:#ffffff;letter-spacing:0.5px;">Krushi Scan</h2>
            <p style="margin:4px 0 0 0;color:#dcfce7;font-size:12px;">Smart Farming Platform</p>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 12px 0;">Hello,</p>
            <p style="margin:0 0 12px 0;">Thank you for signing up with <strong>Krushi Scan</strong>.</p>
            <p style="margin:0 0 12px 0;">To complete your registration, please use the One-Time Password (OTP) below:</p>
            <div style="margin:16px 0;padding:14px 16px;background:#ecfdf3;border:1px solid #bbf7d0;border-radius:10px;">
              <p style="margin:0;font-size:14px;color:#166534;">OTP</p>
              <p style="margin:4px 0 0 0;font-size:28px;letter-spacing:6px;font-weight:700;color:#14532d;">${otp}</p>
            </div>
            <p style="margin:0 0 12px 0;">This OTP is valid for the next <strong>${otpExpiryMinutes} minute</strong>. Please do not share this code with anyone for security reasons.</p>
            <p style="margin:0 0 12px 0;">If you did not request this, please ignore this email.</p>
            <p style="margin:0;">Regards,<br/><strong>Krushi Scan Team</strong></p>
          </div>
          <div style="border-top:1px solid #e5e7eb;background:#fafafa;padding:12px 24px;">
            <p style="margin:0;color:#6b7280;font-size:12px;">This is an automated message from Krushi Scan. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ message: 'OTP resent to your email.' });
}
