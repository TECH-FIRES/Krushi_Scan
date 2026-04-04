import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();

  if (!email || !otp || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user || !user.verified) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 401 });
  }

  if (!user.otp || user.otp !== otp) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
  }

  const now = new Date();
  const otpCreatedAt = user.otpCreatedAt ? new Date(user.otpCreatedAt) : null;
  if (!otpCreatedAt || now.getTime() - otpCreatedAt.getTime() > 1 * 60 * 1000) {
    return NextResponse.json({ error: 'OTP expired' }, { status: 410 });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpCreatedAt = undefined;
  await user.save();

  return NextResponse.json({ message: 'Password reset successful. Please login.' });
}
