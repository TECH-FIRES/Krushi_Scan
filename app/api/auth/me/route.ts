import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Define User schema
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

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection failed in /api/auth/me:', dbError);
      return NextResponse.json({ user: null }, { status: 200 });
    }
    
    const user = await User.findById(decoded.userId).select('-password -otp');
    
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        farmName: user.farmName,
        farmSize: user.farmSize,
        farmLocation: user.farmLocation,
        cropsGrown: user.cropsGrown,
        state: user.state,
        district: user.district,
        village: user.village,
        bio: user.bio,
        soilHealth: user.soilHealth,
        totalFields: user.totalFields,
        totalSensors: user.totalSensors,
        memberSince: user.memberSince,
        avatar: user.avatar,
        profileSettings: user.profileSettings,
      }
    });
  } catch (e) {
    console.error('Error in /api/auth/me:', e);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection failed in PUT /api/auth/me:', dbError);
      return NextResponse.json({ error: 'Database connection failed. Please check MongoDB configuration.' }, { status: 500 });
    }
    
    const updates = await request.json();
    
    // Filter allowed fields to prevent privilege escalation
    const allowedFields = [
      'name', 'phone', 'farmName', 'farmSize', 'farmLocation', 'cropsGrown',
      'state', 'district', 'village', 'bio', 'soilHealth', 'totalFields',
      'totalSensors', 'avatar', 'profileSettings'
    ];
    
    const filteredUpdates: any = {};
    for (const [key, value] of Object.entries(updates)) {
      if (key === 'profileSettings' && value && typeof value === 'object') {
        const allowedSettings = ['weatherAlerts', 'marketAlerts', 'emailNotifications', 'smsNotifications', 'language'];
        const profileSettings: any = {};
        for (const [settingKey, settingValue] of Object.entries(value as Record<string, unknown>)) {
          if (allowedSettings.includes(settingKey)) {
            profileSettings[settingKey] = settingValue;
          }
        }
        filteredUpdates.profileSettings = profileSettings;
      } else if (allowedFields.includes(key)) {
        filteredUpdates[key] = value;
      }
    }
    
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      filteredUpdates,
      { new: true }
    ).select('-password -otp');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        farmName: user.farmName,
        farmSize: user.farmSize,
        farmLocation: user.farmLocation,
        cropsGrown: user.cropsGrown,
        state: user.state,
        district: user.district,
        village: user.village,
        bio: user.bio,
        soilHealth: user.soilHealth,
        totalFields: user.totalFields,
        totalSensors: user.totalSensors,
        memberSince: user.memberSince,
        avatar: user.avatar,
        profileSettings: user.profileSettings,
      }
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
