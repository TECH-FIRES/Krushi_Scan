
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
// Define User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpCreatedAt: Date,
  verified: Boolean,
  createdAt: Date,
  // Profile fields
  phone: String,
  farmName: String,
  farmSize: String,
  farmLocation: String,
  cropsGrown: [String],
  state: String,
  district: String,
  village: String,
  bio: String,
  soilHealth: { type: String, default: 'Good' },
  totalFields: { type: Number, default: 1 },
  totalSensors: { type: Number, default: 0 },
  memberSince: String,
  avatar: String,
  profileSettings: {
    weatherAlerts: { type: Boolean, default: true },
    marketAlerts: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
  },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Helper to generate a secure 6-digit OTP using crypto
function generateOTP() {
  // Generate 3 random bytes and convert to a number between 0 and 999999
  const buffer = crypto.randomBytes(3);
  const otpNum = buffer.readUIntBE(0, 3) % 1000000;
  return otpNum.toString().padStart(6, '0');
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection failed in signup:', dbError);
      return NextResponse.json({ error: 'Database connection failed. Please check MongoDB configuration.' }, { status: 500 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const otpCreatedAt = new Date();
  const createdDate = new Date();
  const monthYear = createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  
  const user = new User({
    name,
    email,
    password: hashedPassword,
    otp,
    otpCreatedAt,
    verified: false,
    createdAt: createdDate,
    // Default profile fields
    phone: '',
    farmName: `${name}'s Farm`,
    farmSize: '',
    farmLocation: '',
    cropsGrown: [],
    state: '',
    district: '',
    village: '',
    bio: '',
    soilHealth: 'Good',
    totalFields: 1,
    totalSensors: 0,
    memberSince: monthYear,
    profileSettings: {
      weatherAlerts: true,
      marketAlerts: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
    },
  });
  await user.save();

  // Send OTP email
  const otpExpiryMinutes = 1;
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Krushi Scan Signup OTP Verification',
        text: `Hello,

Thank you for signing up with Krushi Scan.

To complete your registration, please use the One-Time Password (OTP) below:

OTP: ${otp}

This OTP is valid for the next ${otpExpiryMinutes} minutes. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email.

Regards,
Krushi Scan Team`,
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
          <p style="margin:0 0 12px 0;">This OTP is valid for the next <strong>${otpExpiryMinutes} minutes</strong>. Please do not share this code with anyone for security reasons.</p>
          <p style="margin:0 0 12px 0;">If you did not request this, please ignore this email.</p>
          <p style="margin:0;">Regards,<br/><strong>Krushi Scan Team</strong></p>
          </div>
          <div style="border-top:1px solid #e5e7eb;background:#fafafa;padding:12px 24px;">
            <p style="margin:0;color:#6b7280;font-size:12px;">
              This is an automated message from Krushi Scan. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json({ error: 'Failed to send OTP email. Please check email configuration.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Signup successful, OTP sent to email.' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Signup failed' },
      { status: 500 }
    );
  }
}
