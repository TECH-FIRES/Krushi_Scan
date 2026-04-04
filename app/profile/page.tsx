'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, LogOut, Edit2, Mail, MapPin, Sprout, Shield, 
  Save, X, Award, Cloud, Radio, CheckCircle, Settings
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  farmName?: string
  farmSize?: string
  farmLocation?: string
  cropsGrown?: string[]
  memberSince?: string
  totalFields?: number
  totalSensors?: number
  soilHealth?: string
  avatar?: string
  bio?: string
  state?: string
  district?: string
  village?: string
  profileSettings?: {
    weatherAlerts?: boolean
    marketAlerts?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    language?: string
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<UserProfile>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          router.push('/login')
          return
        }
        const data = await res.json()
        const userData = data.user
        
        // Use real user data from API
        const profileData: UserProfile = {
          id: userData?.id || '12345',
          name: userData?.name || 'Farmer',
          email: userData?.email || 'farmer@krushiscan.com',
          phone: userData?.phone || '',
          farmName: userData?.farmName || 'My Farm',
          farmSize: userData?.farmSize || '',
          farmLocation: userData?.farmLocation || '',
          cropsGrown: userData?.cropsGrown || [],
          memberSince: userData?.memberSince || 'Recently joined',
          totalFields: userData?.totalFields || 1,
          totalSensors: userData?.totalSensors || 0,
          soilHealth: userData?.soilHealth || 'Good',
          state: userData?.state || '',
          district: userData?.district || '',
          village: userData?.village || '',
          bio: userData?.bio || '',
          avatar: userData?.avatar || '/avatars/farmer-1.jpg',
          profileSettings: {
            weatherAlerts: userData?.profileSettings?.weatherAlerts ?? true,
            marketAlerts: userData?.profileSettings?.marketAlerts ?? true,
            emailNotifications: userData?.profileSettings?.emailNotifications ?? true,
            smsNotifications: userData?.profileSettings?.smsNotifications ?? false,
            language: userData?.profileSettings?.language || 'en'
          }
        }
        
        setUser(profileData)
        setEditData(profileData)
      } catch (err) {
        setError('Failed to load profile')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (err) {
      setError('Logout failed')
    }
  }

  const handleSaveProfile = async () => {
    setError('')
    setSuccess('')
    
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })

      if (!res.ok) throw new Error('Failed to update profile')

      setUser(editData as UserProfile)
      setIsEditing(false)
      setSuccess('Profile updated successfully!')
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to save changes')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-spring-400/30 border-t-spring-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Profile not found</p>
          <Link href="/login" className="text-spring-400 font-semibold hover:text-spring-300">
            Return to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 pb-24">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-48 md:h-56 bg-gradient-to-r from-spring-400 via-electric-400 to-sky-400 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)' }}>Welcome Back!</h1>
            <p className="text-white mt-2 text-sm md:text-base font-medium drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Manage your farming profile and settings</p>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-medium transition-all border border-white/30"
            >
              <LogOut size={18} /> Logout
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 -mt-8 relative"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-spring-400 to-electric-400 flex items-center justify-center text-white text-2xl font-bold shadow-md border-4 border-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-nature-forest">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.farmName || 'Farmer'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
          >
            <span className="text-lg">⚠️</span>
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2"
          >
            <CheckCircle size={18} />
            {success}
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card-bento-sky p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Member Since</p>
                <p className="text-lg font-bold text-nature-forest mt-1">{user.memberSince?.split(' ')[0] || 'N/A'}</p>
              </div>
              <Award size={24} className="text-sky-400 opacity-60" />
            </div>
          </div>
          <div className="card-bento-mint p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Total Fields</p>
                <p className="text-lg font-bold text-nature-forest mt-1">{user.totalFields}</p>
              </div>
              <Sprout size={24} className="text-mint-400 opacity-60" />
            </div>
          </div>
          <div className="card-bento-peach p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Active Sensors</p>
                <p className="text-lg font-bold text-nature-forest mt-1">{user.totalSensors}</p>
              </div>
              <Radio size={24} className="text-peach-400 opacity-60" />
            </div>
          </div>
          <div className="card-bento-butter p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Soil Health</p>
                <p className="text-lg font-bold text-green-600 mt-1">{user.soilHealth}</p>
              </div>
              <Cloud size={24} className="text-sky-400 opacity-60" />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card-bento-mint p-6 rounded-squircle sticky top-40">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse" />
                  Active
                </span>
                {!isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="p-2 hover:bg-white/40 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} className="text-nature-forest" />
                  </motion.button>
                )}
              </div>

              {/* Name & Farm */}
              {isEditing ? (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/50 text-center font-bold text-sm"
                    placeholder="Full Name"
                  />
                </div>
              ) : (
                <div className="text-center mb-6 min-w-0 pb-4 border-b border-white/40">
                  <h2 className="text-2xl font-bold text-nature-forest">{user.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{user.farmName || 'Farmer'}</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                    <MapPin size={12} />
                    {user.state || 'Location not set'}
                  </p>
                </div>
              )}

              {/* Profile Stats */}
              {!isEditing && (
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</p>
                    <p className="text-sm text-gray-800 mt-1 truncate">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</p>
                      <p className="text-sm text-gray-800">{user.phone}</p>
                    </div>
                  )}
                  {user.bio && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Bio</p>
                      <p className="text-sm text-gray-700 line-clamp-3">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 bg-nature-forest/20 hover:bg-nature-forest/30 text-nature-forest font-semibold py-2.5 rounded-lg transition-colors mt-4"
                >
                  <Edit2 size={16} /> Edit Profile
                </motion.button>
              ) : (
                <div className="w-full flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} /> Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsEditing(false)
                      setEditData(user)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    <X size={16} /> Cancel
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="card-bento-peach p-8 rounded-squircle shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white/50">
                  <User size={24} className="text-nature-forest" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-nature-forest">Personal Information</h3>
                  <p className="text-xs text-gray-600">Update your personal details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/40">
                    <Mail size={16} className="text-gray-500" />
                    <p className="text-gray-900 text-sm truncate">{user.email}</p>
                  </div>
                </div>

                <div className="min-w-0 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.phone || '- Not provided'}</p>
                  )}
                </div>

                <div className="min-w-0 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio || ''}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest resize-none"
                      rows={2}
                      placeholder="Tell us about yourself"
                    />
                  ) : (
                    <p className="text-gray-700 line-clamp-3 leading-relaxed">{user.bio || '- Not provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Farm Information */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="card-bento-lavender p-8 rounded-squircle shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white/50">
                  <Sprout size={24} className="text-nature-forest" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-nature-forest">Farm Information</h3>
                  <p className="text-xs text-gray-600">Manage your farm details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.farmName || ''}
                      onChange={(e) => setEditData({ ...editData, farmName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.farmName || '- Not provided'}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Size</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.farmSize || ''}
                      onChange={(e) => setEditData({ ...editData, farmSize: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                      placeholder="e.g., 2.5 Acres"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.farmSize || '- Not provided'}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.state || ''}
                      onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500 flex-shrink-0" />
                      {user.state || '- Not provided'}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.district || ''}
                      onChange={(e) => setEditData({ ...editData, district: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.district || '- Not provided'}</p>
                  )}
                </div>

                <div className="min-w-0 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Village</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.village || ''}
                      onChange={(e) => setEditData({ ...editData, village: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.village || '- Not provided'}</p>
                  )}
                </div>

                <div className="min-w-0 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Health Status</label>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                    <span className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                    {user.soilHealth}
                  </div>
                </div>

                <div className="min-w-0 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Crops Grown</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.cropsGrown?.join(', ') || ''}
                      onChange={(e) => setEditData({ ...editData, cropsGrown: e.target.value.split(',').map(c => c.trim()).filter(c => c) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-nature-forest/30 focus:border-nature-forest"
                      placeholder="e.g., Wheat, Rice, Mustard"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.cropsGrown && user.cropsGrown.length > 0 ? (
                        user.cropsGrown.map((crop, idx) => (
                          <span key={idx} className="px-4 py-2 bg-white/60 text-gray-900 rounded-full text-sm font-medium border border-white/80">
                            {crop}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No crops added yet</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* System Information */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="card-bento-butter p-8 rounded-squircle shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white/50">
                  <Shield size={24} className="text-nature-forest" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-nature-forest">Smart Farm Status</h3>
                  <p className="text-xs text-gray-600">Your farming infrastructure</p>
                </div>
              </div>
            </motion.div>

            {/* Profile Settings */}
            <div className="card-bento-sky p-6 rounded-squircle">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-white/40">
                  <Settings size={20} className="text-nature-forest" />
                </div>
                <h3 className="font-bold text-lg text-nature-forest">Profile Settings</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'weatherAlerts', label: 'Weather Alerts' },
                  { key: 'marketAlerts', label: 'Market Price Alerts' },
                  { key: 'emailNotifications', label: 'Email Notifications' },
                  { key: 'smsNotifications', label: 'SMS Notifications' }
                ].map((setting) => (
                  <div key={setting.key} className="bg-white/30 rounded-lg p-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{setting.label}</p>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={Boolean(editData.profileSettings?.[setting.key as keyof NonNullable<UserProfile['profileSettings']>])}
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            profileSettings: {
                              ...editData.profileSettings,
                              [setting.key]: e.target.checked
                            }
                          })
                        }}
                        className="h-4 w-4 accent-nature-forest"
                      />
                    ) : (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${user.profileSettings?.[setting.key as keyof NonNullable<UserProfile['profileSettings']>] ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {user.profileSettings?.[setting.key as keyof NonNullable<UserProfile['profileSettings']>] ? 'On' : 'Off'}
                      </span>
                    )}
                  </div>
                ))}

                <div className="md:col-span-2 bg-white/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                  {isEditing ? (
                    <select
                      value={editData.profileSettings?.language || 'en'}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          profileSettings: {
                            ...editData.profileSettings,
                            language: e.target.value
                          }
                        })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/50 text-sm"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="mr">Marathi</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-800 font-medium">
                      {user.profileSettings?.language === 'hi'
                        ? 'Hindi'
                        : user.profileSettings?.language === 'mr'
                          ? 'Marathi'
                          : 'English'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
