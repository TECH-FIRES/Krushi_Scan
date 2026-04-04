'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Cloud, MapPin, LocateFixed, Loader, ChevronDown, Camera, Lightbulb } from 'lucide-react'
import Link from 'next/link'

interface CropRecommendation {
  name: string
  confidence: number
  soilType: string
  waterNeeds: string
  season: string
}

interface RegionalData {
  state: string
  district: string
  weather: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
  }
  crops: CropRecommendation[]
}

const statesData: Record<string, string[]> = {
  'Maharashtra': ['Pune', 'Mumbai', 'Nashik', 'Kolhapur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Meerut'],
  'Karnataka': ['Bangalore', 'Mysore', 'Belgaum', 'Davangere'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Gujarat': ['Ahmedabad', 'Vadodara', 'Surat', 'Bharuch'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior'],
}

const cropsDatabase: Record<string, Record<string, CropRecommendation[]>> = {
  'Maharashtra': {
    'Pune': [
      { name: 'Sugarcane', confidence: 92, soilType: 'Loamy', waterNeeds: 'High', season: 'Year-round' },
      { name: 'Jowar', confidence: 85, soilType: 'Black Soil', waterNeeds: 'Medium', season: 'Monsoon' },
      { name: 'Cotton', confidence: 78, soilType: 'Black Soil', waterNeeds: 'High', season: 'Monsoon' },
    ],
    'Nashik': [
      { name: 'Grapes', confidence: 94, soilType: 'Volcanic', waterNeeds: 'Medium', season: 'Year-round' },
      { name: 'Onion', confidence: 88, soilType: 'Loamy', waterNeeds: 'Low', season: 'Winter' },
      { name: 'Sugarcane', confidence: 82, soilType: 'Loamy', waterNeeds: 'High', season: 'Year-round' },
    ],
  },
  'Uttar Pradesh': {
    'Lucknow': [
      { name: 'Wheat', confidence: 91, soilType: 'Loamy', waterNeeds: 'Medium', season: 'Winter' },
      { name: 'Rice', confidence: 86, soilType: 'Clay', waterNeeds: 'High', season: 'Monsoon' },
      { name: 'Sugarcane', confidence: 79, soilType: 'Loamy', waterNeeds: 'High', season: 'Year-round' },
    ],
  },
  'Karnataka': {
    'Bangalore': [
      { name: 'Coffee', confidence: 90, soilType: 'Red Soil', waterNeeds: 'Medium', season: 'Year-round' },
      { name: 'Cardamom', confidence: 87, soilType: 'Black Soil', waterNeeds: 'High', season: 'Monsoon' },
      { name: 'Pepper', confidence: 84, soilType: 'Loamy', waterNeeds: 'High', season: 'Year-round' },
    ],
  },
  'Tamil Nadu': {
    'Coimbatore': [
      { name: 'Cotton', confidence: 93, soilType: 'Black Soil', waterNeeds: 'Medium', season: 'Kharif' },
      { name: 'Maize', confidence: 88, soilType: 'Loamy', waterNeeds: 'Low', season: 'Kharif' },
      { name: 'Coconut', confidence: 80, soilType: 'Sandy Loam', waterNeeds: 'High', season: 'Year-round' },
    ],
    'Chennai': [
      { name: 'Rice', confidence: 91, soilType: 'Clay', waterNeeds: 'High', season: 'Kharif' },
      { name: 'Groundnut', confidence: 84, soilType: 'Sandy', waterNeeds: 'Medium', season: 'Year-round' },
    ],
    'Salem': [
      { name: 'Mango', confidence: 90, soilType: 'Red Soil', waterNeeds: 'Medium', season: 'Summer' },
      { name: 'Tapioca', confidence: 85, soilType: 'Loamy', waterNeeds: 'Low', season: 'Year-round' },
    ],
    'Madurai': [
      { name: 'Jasmine', confidence: 92, soilType: 'Red Soil', waterNeeds: 'Medium', season: 'Year-round' },
      { name: 'Paddy', confidence: 89, soilType: 'Clay Soil', waterNeeds: 'High', season: 'Kharif' },
    ]
  },
  'Gujarat': {
    'Ahmedabad': [
      { name: 'Cotton', confidence: 95, soilType: 'Black Soil', waterNeeds: 'Medium', season: 'Kharif' },
      { name: 'Groundnut', confidence: 89, soilType: 'Sandy Loam', waterNeeds: 'Low', season: 'Kharif' },
      { name: 'Cumin', confidence: 82, soilType: 'Loamy', waterNeeds: 'Low', season: 'Rabi' },
    ],
    'Surat': [
      { name: 'Sugarcane', confidence: 90, soilType: 'Black Soil', waterNeeds: 'High', season: 'Year-round' },
      { name: 'Banana', confidence: 85, soilType: 'Loamy', waterNeeds: 'High', season: 'Year-round' }
    ]
  },
  'Madhya Pradesh': {
    'Indore': [
      { name: 'Soybean', confidence: 94, soilType: 'Black Soil', waterNeeds: 'Medium', season: 'Kharif' },
      { name: 'Wheat', confidence: 90, soilType: 'Loamy', waterNeeds: 'Medium', season: 'Rabi' },
      { name: 'Gram', confidence: 85, soilType: 'Loamy', waterNeeds: 'Low', season: 'Rabi' },
    ]
  }
}

const defaultCrops: CropRecommendation[] = [
  { name: 'Tomato', confidence: 85, soilType: 'Loamy', waterNeeds: 'Medium', season: 'All-season' },
  { name: 'Chili', confidence: 82, soilType: 'Loamy', waterNeeds: 'Low', season: 'All-season' },
  { name: 'Spinach', confidence: 78, soilType: 'Well-drained', waterNeeds: 'Medium', season: 'All-season' },
  { name: 'Onion', confidence: 80, soilType: 'Sandy Loam', waterNeeds: 'Low', season: 'Rabi' },
  { name: 'Maize', confidence: 83, soilType: 'Loamy', waterNeeds: 'Medium', season: 'Kharif' },
  { name: 'Groundnut', confidence: 79, soilType: 'Sandy', waterNeeds: 'Low', season: 'Kharif' },
  { name: 'Paddy', confidence: 81, soilType: 'Clay Soil', waterNeeds: 'High', season: 'Kharif' },
  { name: 'Turmeric', confidence: 77, soilType: 'Loamy', waterNeeds: 'Medium', season: 'Monsoon' },
  { name: 'Soybean', confidence: 84, soilType: 'Black Soil', waterNeeds: 'Medium', season: 'Kharif' },
]

const isValidIndianPincode = (value: string) => /^[1-9][0-9]{5}$/.test(value)

export default function IntelligencePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedPincode, setSelectedPincode] = useState<string | null>(null)
  const [regionalData, setRegionalData] = useState<RegionalData | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [isResolvingPincode, setIsResolvingPincode] = useState(false)
  const [locationNotice, setLocationNotice] = useState('')
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)

  const getRegionalData = (state: string, district: string): RegionalData => {
    const dbCrops = cropsDatabase[state]?.[district] || []
    const crops = [...dbCrops, ...defaultCrops]
      .filter((crop, index, arr) => arr.findIndex((c) => c.name === crop.name) === index)
      .slice(0, 6)

    return {
      state,
      district,
      weather: {
        temperature: 28 + Math.random() * 8,
        humidity: 60 + Math.random() * 20,
        rainfall: 50 + Math.random() * 150,
        windSpeed: 8 + Math.random() * 7,
      },
      crops,
    }
  }

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/district|division|urban|rural/g, '')
      .replace(/\s+/g, ' ')
      .trim()

  const findStateByDistrict = (rawDistrict: string) => {
    const normDistrict = normalize(rawDistrict)
    for (const state of Object.keys(statesData)) {
      const match = statesData[state].find((d) => {
        const nd = normalize(d)
        return nd.includes(normDistrict) || normDistrict.includes(nd)
      })
      if (match) {
        return { state, district: match }
      }
    }
    return null
  }

  const resolveAndSetLocation = (
    rawState: string,
    districtCandidates: string[],
    pincode?: string | null
  ) => {
    let matchedState = Object.keys(statesData).find((state) => {
      const ns = normalize(state)
      const rs = normalize(rawState)
      return rs.includes(ns) || ns.includes(rs)
    })

    let matchedDistrict: string | undefined

    if (matchedState) {
      matchedDistrict = statesData[matchedState].find((district) => {
        const nd = normalize(district)
        return districtCandidates.some((candidate) => {
          const nc = normalize(candidate)
          return nc.includes(nd) || nd.includes(nc)
        })
      })
    }

    if (!matchedState) {
      const found = districtCandidates
        .map((candidate) => findStateByDistrict(candidate))
        .find(Boolean)
      if (found) {
        matchedState = found.state
        matchedDistrict = found.district
      }
    }

    if (!matchedState) {
      setLocationNotice('Could not match this location to available demo regions. Please select manually.')
      return false
    }

    const fallbackDistrict = statesData[matchedState][0]
    const finalDistrict = matchedDistrict || fallbackDistrict

    setSelectedState(matchedState)
    setSelectedDistrict(finalDistrict)
    setRegionalData(getRegionalData(matchedState, finalDistrict))

    if (pincode) {
      setSelectedPincode(pincode)
    }

    if (matchedDistrict) {
      setLocationNotice(
        pincode
          ? `Detected: ${finalDistrict}, ${matchedState} (PIN: ${pincode})`
          : `Detected: ${finalDistrict}, ${matchedState}`
      )
    } else {
      setLocationNotice(
        pincode
          ? `Detected state ${matchedState}. District set to ${finalDistrict} (PIN: ${pincode}).`
          : `Detected state ${matchedState}. District set to ${finalDistrict}.`
      )
    }

    return true
  }

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedDistrict(null)
    setSelectedPincode(null)
    setRegionalData(null)
  }

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
    if (selectedState) {
      setRegionalData(getRegionalData(selectedState, district))
    }
  }

  const handleDetectLocation = async () => {
    setLocationNotice('')

    if (!navigator.geolocation) {
      setLocationNotice('Geolocation is not supported by your browser.')
      return
    }

    setIsDetectingLocation(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )

      if (!response.ok) {
        throw new Error('Reverse geocoding failed')
      }

      const geo = await response.json()
      const address = geo?.address || {}
      const detectedPincode = typeof address.postcode === 'string' ? address.postcode : null

      const rawState =
        address.state ||
        address.region ||
        address.province ||
        ''

      const districtCandidates = [
        address.city,
        address.town,
        address.village,
        address.county,
        address.state_district,
        address.municipality,
        address.suburb,
      ].filter(Boolean) as string[]

      resolveAndSetLocation(rawState, districtCandidates, detectedPincode)
    } catch (error: any) {
      if (error?.code === 1) {
        setLocationNotice('Location access denied. Please allow permission and try again.')
      } else if (error?.code === 3) {
        setLocationNotice('Location request timed out. Please try again.')
      } else {
        setLocationNotice('Could not detect your location. Please select manually.')
      }
    } finally {
      setIsDetectingLocation(false)
    }
  }

  useEffect(() => {
    let active = true

    const resolveFromPincode = async () => {
      if (!selectedPincode) {
        return
      }

      if (selectedPincode.length < 6) {
        return
      }

      if (!isValidIndianPincode(selectedPincode)) {
        setLocationNotice('Please enter a valid Indian PIN code (6 digits, starting 1-9).')
        return
      }

      setIsResolvingPincode(true)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=in&postalcode=${selectedPincode}&limit=1`
        )

        if (!response.ok || !active) {
          return
        }

        const results = await response.json()
        if (!active) {
          return
        }

        if (!Array.isArray(results) || results.length === 0) {
          setLocationNotice('PIN code not found. Please verify and try again.')
          return
        }

        const address = results[0]?.address || {}
        const rawState = address.state || address.region || address.province || ''
        const districtCandidates = [
          address.city,
          address.town,
          address.village,
          address.county,
          address.state_district,
          address.municipality,
          address.suburb,
        ].filter(Boolean) as string[]

        resolveAndSetLocation(rawState, districtCandidates, selectedPincode)
      } catch {
        setLocationNotice('Could not resolve this PIN code right now. Please try again.')
      } finally {
        if (active) {
          setIsResolvingPincode(false)
        }
      }
    }

    const timer = setTimeout(resolveFromPincode, 500)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [selectedPincode])

  const states = Object.keys(statesData)
  const districts = selectedState ? statesData[selectedState] : []

  return (
    <div className="min-h-screen bg-nature-sage p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-nature-forest mb-2">
          <Globe className="inline mr-3" size={40} />
          Regional Intelligence
        </h1>
        <p className="text-gray-600">Get location-based crop recommendations and weather insights</p>
      </motion.div>

      {/* Selection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* State Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select State</label>
          <select
            value={selectedState || ''}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-forest bg-white"
          >
            <option value="">Choose a state...</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </motion.div>

        {/* District Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select District</label>
          <select
            value={selectedDistrict || ''}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedState}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-forest bg-white disabled:opacity-50"
          >
            <option value="">Choose a district...</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Auto Detect / Location Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 bg-gradient-to-br from-nature-forest/10 to-nature-leaf/10"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-nature-forest" size={20} />
              <h3 className="font-semibold text-gray-900">Current Location</h3>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-nature-forest hover:bg-gray-50 disabled:opacity-70"
            >
              {isDetectingLocation ? <Loader size={16} className="animate-spin" /> : <LocateFixed size={16} />}
              {isDetectingLocation ? 'Detecting...' : 'Use My Location'}
            </button>
          </div>

          {regionalData ? (
            <div>
              <p className="text-lg font-bold text-nature-forest">
                {regionalData.district}, {regionalData.state}
              </p>
              {selectedPincode && (
                <p className="text-sm text-gray-700 mt-1">PIN Code: {selectedPincode}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Use detection or choose state and district manually.</p>
          )}
        </motion.div>

        {/* Manual PIN Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-3">PIN Code Input</h3>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="block text-xs font-semibold text-gray-700">PIN Code (Manual)</label>
              {isResolvingPincode && <Loader size={14} className="animate-spin text-nature-forest" />}
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={selectedPincode || ''}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '')
                setSelectedPincode(numericValue)
                if (numericValue.length === 6 && !isValidIndianPincode(numericValue)) {
                  setLocationNotice('Please enter a valid Indian PIN code (6 digits, starting 1-9).')
                }
              }}
              pattern="[1-9][0-9]{5}"
              placeholder="Enter 6-digit PIN code"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-forest bg-white"
            />
          </div>

          {locationNotice && (
            <p className="text-xs mt-2 text-gray-600">{locationNotice}</p>
          )}
        </motion.div>
      </div>

      {/* Weather & Crops Section */}
      {regionalData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Weather Stats */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-nature-forest mb-4 flex items-center gap-2">
                <Cloud size={24} />
                Weather Conditions
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regionalData.weather.temperature.toFixed(1)}°C
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regionalData.weather.humidity.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rainfall</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regionalData.weather.rainfall.toFixed(1)}mm
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Wind Speed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regionalData.weather.windSpeed.toFixed(1)} km/h
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recommended Crops */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-nature-forest mb-4">Recommended Crops</h3>
              {regionalData.crops.map((crop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card-hover glass-card p-6 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-nature-forest">{crop.name}</h4>
                      <p className="text-sm text-gray-600">{crop.season}</p>
                    </div>
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {crop.confidence}% Match
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.confidence}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="bg-gradient-forest h-2 rounded-full"
                    />
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Soil Type</p>
                      <p className="font-semibold text-gray-900">{crop.soilType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Water Needs</p>
                      <p className="font-semibold text-gray-900">{crop.waterNeeds}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!regionalData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-12 text-center mb-8"
        >
          <Globe size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Your Location</h3>
          <p className="text-gray-600">Choose a state and district to see personalized crop recommendations and weather insights</p>
        </motion.div>
      )}

      {/* Action Dropdowns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Smart Intelligence Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl shadow-lg border border-sky-200/50 overflow-hidden"
        >
          <button
            onClick={() => setExpandedDropdown(expandedDropdown === 'intelligence' ? null : 'intelligence')}
            className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-sky-400 to-sky-350 hover:from-sky-500 hover:to-sky-400 text-white font-bold transition-all duration-200"
          >
            <span className="flex items-center gap-3">
              <Lightbulb size={20} />
              Smart Intelligence
            </span>
            <motion.div
              animate={{ rotate: expandedDropdown === 'intelligence' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          <motion.div
            initial={false}
            animate={{ height: expandedDropdown === 'intelligence' ? 'auto' : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-nature-forest mb-3">AI-Powered Insights</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">✓</span>
                    <span>Region-specific crop recommendations based on climate & soil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">✓</span>
                    <span>Real-time weather forecast impact analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">✓</span>
                    <span>Confidence scores for each crop recommendation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">✓</span>
                    <span>Seasonal optimal planting windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">✓</span>
                    <span>Market demand and profitability analysis</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-gray-600 border-t border-gray-200 pt-4">
                Get personalized farming recommendations powered by machine learning and agricultural data
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Actions Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl shadow-lg border border-electric-200/50 overflow-hidden"
        >
          <button
            onClick={() => setExpandedDropdown(expandedDropdown === 'actions' ? null : 'actions')}
            className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-electric-400 to-electric-350 hover:from-electric-500 hover:to-electric-400 text-white font-bold transition-all duration-200"
          >
            <span className="flex items-center gap-3">
              <Camera size={20} />
              Quick Actions
            </span>
            <motion.div
              animate={{ rotate: expandedDropdown === 'actions' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>
          <motion.div
            initial={false}
            animate={{ height: expandedDropdown === 'actions' ? 'auto' : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-nature-forest mb-4">Get Started</h4>
                <Link href="/scan" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-electric-400 to-electric-500 text-white rounded-xl font-bold hover:shadow-lg transition-all text-center"
                  >
                    📸 Scan Farm & Fields
                  </motion.button>
                </Link>
                <p className="text-xs text-gray-600">
                  Use AI image recognition to analyze your crops, soil conditions, and get instant insights
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <h4 className="font-semibold text-nature-forest">Crop Resources</h4>
                <Link href="/resources" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-mint-400 to-mint-500 text-white rounded-xl font-bold hover:shadow-lg transition-all text-center"
                  >
                    🌱 Explore Crops A-Z
                  </motion.button>
                </Link>
                <p className="text-xs text-gray-600">
                  Browse comprehensive guides on growing, fertilizers, profitability, and market trends for each crop
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
