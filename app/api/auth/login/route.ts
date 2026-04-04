import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

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

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user || !user.verified) {
      return NextResponse.json({ error: 'Invalid credentials or not verified' }, { status: 401 });
    }
    // Debug: log the hashed password and input password
    console.log('Login attempt for:', email);
    console.log('Input password:', password);
    console.log('Stored hash:', user.password);
    const valid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', valid);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // Create JWT with all user fields
    const token = jwt.sign({ 
      userId: user._id, 
      email: user.email, 
      name: user.name,
      phone: user.phone,
      farmName: user.farmName,
      farmSize: user.farmSize,
      state: user.state,
      district: user.district,
      village: user.village,
      cropsGrown: user.cropsGrown,
      bio: user.bio,
      soilHealth: user.soilHealth,
      totalFields: user.totalFields,
      totalSensors: user.totalSensors,
      memberSince: user.memberSince,
      profileSettings: user.profileSettings,
    }, JWT_SECRET, { expiresIn: '7d' });
    // Set HTTP-only cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    const res = NextResponse.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        farmName: user.farmName,
        farmSize: user.farmSize,
        state: user.state,
        district: user.district,
        village: user.village,
        cropsGrown: user.cropsGrown,
        bio: user.bio,
        soilHealth: user.soilHealth,
        totalFields: user.totalFields,
        totalSensors: user.totalSensors,
        memberSince: user.memberSince,
        profileSettings: user.profileSettings,
      }
    });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database connection failed. Please check MongoDB configuration.' },
      { status: 500 }
    );
  }
}
