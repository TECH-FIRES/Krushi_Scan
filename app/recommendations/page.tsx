'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Leaf, Beaker, Calculator, Loader2, LocateFixed, MapPin, Thermometer, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function RecommendationsPage() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    temperature: '',
  })
  const [loading, setLoading] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeLoading, setPincodeLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [detectedTemperature, setDetectedTemperature] = useState<number | null>(null)
  const [result, setResult] = useState<{
    fertilizer: string;
    irrigation: string;
    risk: string;
  } | null>(null)

  const isValidIndianPincode = (value: string) => /^[1-9][0-9]{5}$/.test(value)

  const parsedInputTemperature = formData.temperature ? Number(formData.temperature) : null
  const temperatureDelta =
    detectedTemperature !== null && parsedInputTemperature !== null && !Number.isNaN(parsedInputTemperature)
      ? Math.abs(parsedInputTemperature - detectedTemperature)
      : null

  const handleDetectLocationAndTemperature = async () => {
    setLocationError('')
    setLocationLoading(true)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      setLocationLoading(false)
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      const reverseGeoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )

      if (!reverseGeoRes.ok) {
        throw new Error('Failed to resolve address from coordinates')
      }

      const reverseGeoData = await reverseGeoRes.json()
      const address = reverseGeoData?.address || {}
      const city = address.city || address.town || address.village || address.hamlet || ''
      const state = address.state || ''
      const detectedPincode = typeof address.postcode === 'string' ? address.postcode.replace(/\D/g, '') : ''
      const readableLocation = [city, state]
        .filter(Boolean)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .join(', ')
      setLocationName(readableLocation || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)

      if (detectedPincode && isValidIndianPincode(detectedPincode)) {
        setPincode(detectedPincode)
      }

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      )

      if (!weatherRes.ok) {
        throw new Error('Failed to fetch current weather temperature')
      }

      const weatherData = await weatherRes.json()
      const currentTemp = weatherData?.current?.temperature_2m

      if (typeof currentTemp === 'number') {
        setDetectedTemperature(currentTemp)
      } else {
        setDetectedTemperature(null)
      }
    } catch (error: any) {
      if (error?.code === 1) {
        setLocationError('Location permission denied. Please allow access and try again.')
      } else if (error?.code === 3) {
        setLocationError('Location request timed out. Please try again.')
      } else {
        setLocationError('Could not detect location/temperature right now.')
      }
    } finally {
      setLocationLoading(false)
    }
  }

  const resolveByPincode = async (pin: string) => {
    setLocationError('')

    if (!isValidIndianPincode(pin)) {
      setLocationError('Please enter a valid Indian PIN code (6 digits, starting 1-9).')
      return
    }

    setPincodeLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=in&postalcode=${pin}&limit=1`
      )

      if (!response.ok) {
        throw new Error('PIN lookup failed')
      }

      const results = await response.json()
      if (!Array.isArray(results) || results.length === 0) {
        setLocationError('PIN code not found. Please check and try again.')
        return
      }

      const best = results[0]
      const address = best?.address || {}
      const city = address.city || address.town || address.village || address.hamlet || ''
      const state = address.state || ''
      const readableLocation = [city, state]
        .filter(Boolean)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .join(', ')

      setLocationName(readableLocation || locationName)

      const latitude = Number(best?.lat)
      const longitude = Number(best?.lon)

      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
        )

        if (weatherRes.ok) {
          const weatherData = await weatherRes.json()
          const currentTemp = weatherData?.current?.temperature_2m
          if (typeof currentTemp === 'number') {
            setDetectedTemperature(currentTemp)
          }
        }
      }
    } catch {
      setLocationError('Could not resolve this PIN code right now.')
    } finally {
      setPincodeLoading(false)
    }
  }

  useEffect(() => {
    if (pincode.length === 6) {
      resolveByPincode(pincode)
    }
  }, [pincode])

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Calling our newly generated analyze-soil API
      const res = await fetch('/api/analyze-soil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in pb-24">
      <div>
        <h1 className="text-3xl font-bold text-nature-forest">AI Recommendations</h1>
        <p className="text-gray-600">Smart fertilizer and irrigation suggestions based on your soil profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card !p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-nature-leaf/20 rounded-xl">
              <Calculator className="text-nature-leaf" size={24} />
            </div>
            <h2 className="text-xl font-bold text-nature-forest">Soil Parameters</h2>
          </div>

          <div className="mb-6 p-4 rounded-xl border border-nature-forest/20 bg-nature-forest/5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="text-nature-forest" size={18} />
                <p className="text-sm font-semibold text-gray-800">Location & Temperature Verification</p>
              </div>
              <button
                type="button"
                onClick={handleDetectLocationAndTemperature}
                disabled={locationLoading}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-nature-forest/30 text-nature-forest hover:bg-nature-forest/10 disabled:opacity-60 flex items-center gap-1"
              >
                {locationLoading ? <Loader2 size={14} className="animate-spin" /> : <LocateFixed size={14} />}
                {locationLoading ? 'Detecting...' : 'Use My Location'}
              </button>
            </div>

            <p className="text-sm text-gray-700">
              {locationName ? `Detected location: ${locationName}` : 'Detect location to verify current ambient temperature.'}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter Indian PIN code"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-forest bg-white text-sm"
              />
              <button
                type="button"
                onClick={() => resolveByPincode(pincode)}
                disabled={pincodeLoading || pincode.length !== 6}
                className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-nature-forest hover:bg-gray-50 disabled:opacity-70"
              >
                {pincodeLoading ? <Loader2 size={14} className="animate-spin" /> : 'PIN'}
              </button>
            </div>

            {detectedTemperature !== null && (
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Thermometer size={16} className="text-amber-500" />
                Current detected temperature: <span className="font-semibold">{detectedTemperature.toFixed(1)}°C</span>
              </p>
            )}

            {locationError && <p className="text-xs text-red-600">{locationError}</p>}
            <p className="text-xs text-gray-500">Temperature and soil moisture will be auto-collected from ESP32 later.</p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
                <input required type="number" value={formData.nitrogen} onChange={e => setFormData({...formData, nitrogen: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 120" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
                <input required type="number" value={formData.phosphorus} onChange={e => setFormData({...formData, phosphorus: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
                <input required type="number" value={formData.potassium} onChange={e => setFormData({...formData, potassium: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                <input required type="number" step="0.1" value={formData.ph} onChange={e => setFormData({...formData, ph: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 6.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moisture (%)</label>
                <input required type="number" value={formData.moisture} onChange={e => setFormData({...formData, moisture: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 45" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                <input required type="number" value={formData.temperature} onChange={e => setFormData({...formData, temperature: e.target.value})} className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-nature-leaf focus:border-transparent outline-none" placeholder="e.g. 28" />
              </div>
            </div>

            {temperatureDelta !== null && (
              <div className={`rounded-xl px-3 py-2 text-sm flex items-center gap-2 ${temperatureDelta <= 2 ? 'bg-green-50 text-green-700 border border-green-200' : temperatureDelta <= 5 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {temperatureDelta <= 2 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {temperatureDelta <= 2
                  ? 'Entered temperature is close to detected ambient temperature.'
                  : temperatureDelta <= 5
                    ? 'Entered temperature differs slightly from detected ambient temperature.'
                    : 'Entered temperature differs significantly from detected ambient temperature.'}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-forest text-white rounded-xl font-semibold mt-6 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Generate Recommendations'}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {result ? (
            <>
              <div className="glass-card !p-6 border-l-4 border-l-nature-leaf">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="text-nature-leaf" />
                  <h3 className="font-bold text-gray-800">Fertilizer Suggestion</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {result.fertilizer}
                </p>
              </div>

              <div className="glass-card !p-6 border-l-4 border-l-blue-400">
                <div className="flex items-center gap-3 mb-2">
                  <Droplet className="text-blue-500" />
                  <h3 className="font-bold text-gray-800">Irrigation Plan</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {result.irrigation}
                </p>
              </div>

              <div className="glass-card !p-6 border-l-4 border-l-amber-500">
                <div className="flex items-center gap-3 mb-2">
                  <Beaker className="text-amber-500" />
                  <h3 className="font-bold text-gray-800">Disease Risk Analysis</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {result.risk}
                </p>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[300px] glass-card flex flex-col items-center justify-center text-gray-400">
              <Calculator size={48} className="mb-4 opacity-50" />
              <p>Enter soil parameters to get AI-driven</p>
              <p>fertilizer and irrigation recommendations.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
