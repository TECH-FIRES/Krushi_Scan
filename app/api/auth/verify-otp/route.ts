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
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  if (user.verified) {
    return NextResponse.json({ error: 'User already verified' }, { status: 400 });
  }
  if (user.otp !== otp) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
  }
  // Check OTP expiry (1 minute)
  const now = new Date();
  const otpCreatedAt = user.otpCreatedAt ? new Date(user.otpCreatedAt) : null;
  if (!otpCreatedAt || (now.getTime() - otpCreatedAt.getTime()) > 1 * 60 * 1000) {
    return NextResponse.json({ error: 'OTP expired' }, { status: 410 });
  }
  user.verified = true;
  user.otp = undefined;
  user.otpCreatedAt = undefined;
  await user.save();
  return NextResponse.json({ message: 'Email verified successfully.' });
}
