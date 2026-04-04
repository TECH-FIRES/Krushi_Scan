'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Thermometer, Cloud, AlertCircle, TrendingUp, Trash2, Bell, RefreshCw } from 'lucide-react'
import { MoistureChart } from '@/components/charts/MoistureChart'
import { WaterloggingAlert } from '@/components/waterlogging/WaterloggingAlert'
import { WaterloggingRiskCard } from '@/components/waterlogging/WaterloggingRiskCard'
import { WaterloggingSensorReadings } from '@/components/waterlogging/WaterloggingSensorReadings'
import { SoilMoistureProgress } from '@/components/waterlogging/SoilMoistureProgress'
import { RecommendationCard } from '@/components/waterlogging/RecommendationCard'
import { RiskHistoryGraph } from '@/components/waterlogging/RiskHistoryGraph'
import type { RiskLevel } from '@/lib/waterlogging'

type SensorReading = {
  soil: number | null
  air: number | null
  hum: number | null
  water: number | null
  timestamp: string | null
}

type SensorHistoryReading = {
  soil: number
  air: number
  hum: number
  water: number
  timestamp: string
}

type Alert = {
  id: number
  type: 'warning' | 'critical'
  message: string
  timestamp: Date
}

interface WaterloggingRiskData {
  risk_level: RiskLevel
  risk_score: number
  soil_status: string
  recommendation: string
  crop_risk: string
  drainage_suggestion: string
  soil_moisture: number
  humidity: number
  temperature: number
  device_id: string
  timestamp: string
}

interface HistoryData {
  _id: string
  timestamp: string
  soil_moisture: number
  humidity: number
  temperature: number
  risk_level: RiskLevel
}

export default function DashboardPage() {
  const [sensorData, setSensorData] = useState<SensorReading>({
    soil: null,
    air: null,
    hum: null,
    water: null,
    timestamp: null,
  })
  const [sensorHistory, setSensorHistory] = useState<SensorHistoryReading[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: 'warning' as const, message: 'Low Moisture in Sector B', timestamp: new Date(Date.now() - 3600000) },
    { id: 2, type: 'critical' as const, message: 'High Temperature Alert - Zone C', timestamp: new Date(Date.now() - 1800000) },
  ])

  // Waterlogging state
  const [riskData, setRiskData] = useState<WaterloggingRiskData | null>(null)
  const [historyData, setHistoryData] = useState<HistoryData[]>([])
  const [waterloggingLoading, setWaterloggingLoading] = useState(true)
  const [waterloggingRefreshing, setWaterloggingRefreshing] = useState(false)
  const [waterloggingError, setWaterloggingError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchLatestSensorData = async () => {
      try {
        const response = await fetch('/api/getdata?limit=48', { cache: 'no-store' })
        if (!response.ok) {
          return
        }

        const latest = await response.json()
        if (!mounted) {
          return
        }

        setSensorData({
          soil: typeof latest.soil === 'number' ? latest.soil : null,
          air: typeof latest.air === 'number' ? latest.air : null,
          hum: typeof latest.hum === 'number' ? latest.hum : null,
          water: typeof latest.water === 'number' ? latest.water : null,
          timestamp: latest.timestamp ?? null,
        })

        const history = Array.isArray(latest.history) ? latest.history : []
        setSensorHistory(
          history
            .filter((item: any) => typeof item?.soil === 'number' && !!item?.timestamp)
            .map((item: any) => ({
              soil: item.soil,
              air: typeof item.air === 'number' ? item.air : 0,
              hum: typeof item.hum === 'number' ? item.hum : 0,
              water: typeof item.water === 'number' ? item.water : 0,
              timestamp: String(item.timestamp),
            }))
        )
      } catch (error) {
        // Keep last known reading if polling fails.
      }
    }

    const fetchWaterloggingData = async () => {
      try {
        setWaterloggingError(null)

        const [riskResponse, historyResponse] = await Promise.all([
          fetch('/api/waterlogging-risk'),
          fetch('/api/waterlogging-risk/history?days=7&limit=50'),
        ])

        if (!riskResponse.ok) {
          throw new Error('Failed to fetch waterlogging risk data')
        }

        const riskJson = await riskResponse.json()
        if (!mounted) {
          return
        }
        setRiskData(riskJson)

        if (historyResponse.ok) {
          const historyJson = await historyResponse.json()
          if (!mounted) {
            return
          }
          setHistoryData(historyJson.data || [])
        }

        setWaterloggingLoading(false)
      } catch (err) {
        if (!mounted) {
          return
        }
        setWaterloggingError(err instanceof Error ? err.message : 'An error occurred')
        setWaterloggingLoading(false)
      } finally {
        if (mounted) {
          setWaterloggingRefreshing(false)
        }
      }
    }

    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts', { cache: 'no-store' })
        if (!response.ok) {
          return
        }

        const data = await response.json()
        if (!mounted) {
          return
        }

        const mapped = Array.isArray(data.alerts)
          ? data.alerts.map((alert: any) => ({
              id: String(alert.id),
              type: alert.type,
              message: alert.message,
              timestamp: new Date(alert.timestamp),
            }))
          : []

        setAlerts(mapped)
      } catch (error) {
        // Keep last known alerts if fetch fails.
      }
    }

    fetchLatestSensorData()
    fetchWaterloggingData()
    fetchAlerts()
    const interval = setInterval(fetchLatestSensorData, 2000)
    const alertInterval = setInterval(fetchAlerts, 5000)
    const waterloggingInterval = setInterval(fetchWaterloggingData, 5 * 60 * 1000)

    return () => {
      mounted = false
      clearInterval(interval)
      clearInterval(alertInterval)
      clearInterval(waterloggingInterval)
    }
  }, [])


  const handleWaterloggingRefresh = async () => {
    try {
      setWaterloggingRefreshing(true)
      setWaterloggingError(null)

      const [riskResponse, historyResponse] = await Promise.all([
        fetch('/api/waterlogging-risk'),
        fetch('/api/waterlogging-risk/history?days=7&limit=50'),
      ])

      if (!riskResponse.ok) {
        throw new Error('Failed to fetch waterlogging risk data')
      }

      const riskJson = await riskResponse.json()
      setRiskData(riskJson)

      if (historyResponse.ok) {
        const historyJson = await historyResponse.json()
        setHistoryData(historyJson.data || [])
      }
    } catch (err) {
      setWaterloggingError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setWaterloggingRefreshing(false)
    }
  }

  const formatReading = (value: number | null, unit: string) => {
    if (value === null) {
      return '--'
    }
    return `${value.toFixed(1)}${unit}`
  }

  const isSensorLive =
    !!sensorData.timestamp && Date.now() - new Date(sensorData.timestamp).getTime() < 20000

  const lastUpdateLabel = sensorData.timestamp
    ? new Date(sensorData.timestamp).toLocaleString()
    : 'Waiting for sensor data'

  const chartData = sensorHistory.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    moisture: item.soil,
  }))

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const getAlertTime = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-4 md:px-8 py-6 md:py-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-nature-forest">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">Real-time farm monitoring and analytics</p>
      </motion.div>

      {/* Main Content */}
      <div className="p-4 md:p-8 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Soil Moisture Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Soil Moisture</p>
                <p className="text-4xl font-bold text-nature-forest">{formatReading(sensorData.soil, '%')}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="text-blue-500" size={28} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-4">
              <AlertCircle size={16} />
              WARNING
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <TrendingUp size={16} />
              <span>Trending up this hour</span>
            </div>
          </motion.div>

          {/* Ambient Temperature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Ambient Temperature</p>
                <p className="text-4xl font-bold text-nature-forest">{formatReading(sensorData.air, '°C')}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Thermometer className="text-red-500" size={28} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-4">
              <AlertCircle size={16} />
              WARNING
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <TrendingUp size={16} />
              <span>Trending up this hour</span>
            </div>
          </motion.div>

          {/* Humidity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 md:col-span-2 lg:col-span-1"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Humidity</p>
                <p className="text-4xl font-bold text-nature-forest">{formatReading(sensorData.hum, '%')}</p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Cloud className="text-cyan-500" size={28} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-4">
              <AlertCircle size={16} />
              WARNING
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <TrendingUp size={16} />
              <span>Trending up this hour</span>
            </div>
          </motion.div>

          {/* Alerts Feed Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bell className="text-nature-forest" size={24} />
                <h2 className="text-xl font-bold text-nature-forest">Alerts Feed</h2>
              </div>
              {alerts.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </div>

            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${
                      alert.type === 'critical'
                        ? 'bg-red-50 border-l-red-500'
                        : 'bg-amber-50 border-l-amber-500'
                    }`}
                  >
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      alert.type === 'critical'
                        ? 'bg-red-200'
                        : 'bg-amber-200'
                    }`}>
                      <AlertCircle className={`${
                        alert.type === 'critical'
                          ? 'text-red-600'
                          : 'text-amber-600'
                      }`} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold ${
                        alert.type === 'critical'
                          ? 'text-red-900'
                          : 'text-amber-900'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getAlertTime(alert.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                      title="Delete alert"
                    >
                      <Trash2 className="text-gray-400 hover:text-gray-600" size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No active alerts</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-nature-forest" size={24} />
            <h2 className="text-xl font-bold text-nature-forest">24-Hour Moisture Trend</h2>
          </div>
          {chartData.length > 0 ? (
            <MoistureChart data={chartData} />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <p>Waiting for chart data</p>
            </div>
          )}
        </motion.div>

        {/* Waterlogging Detection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="text-blue-600" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-nature-forest">Waterlogging Detection</h2>
                <p className="text-gray-600 text-sm">Real-time monitoring and prevention analytics</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWaterloggingRefresh}
              disabled={waterloggingRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${waterloggingRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>

          {/* Loading State */}
          {waterloggingLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl text-blue-600"
              >
                💧
              </motion.div>
            </motion.div>
          )}

          {/* Error State */}
          {waterloggingError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              Error: {waterloggingError}
            </motion.div>
          )}

          {/* Data Display State */}
          {!waterloggingLoading && riskData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Alert Banner */}
              <WaterloggingAlert
                riskLevel={riskData.risk_level}
                message={riskData.recommendation}
                show={true}
              />

            {/* Top Row - Risk Card and Soil Moisture */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
              <div className="lg:col-span-1">
                <WaterloggingRiskCard
                  riskLevel={riskData.risk_level}
                  score={riskData.risk_score}
                />
              </div>

              <div className="lg:col-span-2">
                <SoilMoistureProgress value={riskData.soil_moisture} />
              </div>
            </div>

            {/* Sensor Readings */}
            <div className="mb-6">
              <WaterloggingSensorReadings
                soilMoisture={riskData.soil_moisture}
                humidity={riskData.humidity}
                temperature={riskData.temperature}
              />
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-nature-forest mb-4">AI Analysis & Recommendations</h3>
              <RecommendationCard
                recommendation={riskData.recommendation}
                cropRisk={riskData.crop_risk}
                drainageSuggestion={riskData.drainage_suggestion}
              />
            </div>

            {/* History Graph */}
            {historyData.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-nature-forest mb-4">Historical Trends</h3>
                <RiskHistoryGraph data={historyData} loading={false} />
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-blue-900 mb-2 text-sm">💡 What is Waterlogging?</h3>
                <p className="text-xs text-blue-800">
                  Waterlogging occurs when soil becomes saturated with water, restricting root growth and oxygen availability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-green-900 mb-2 text-sm">🌱 Prevention Tips</h3>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Improve field drainage</li>
                  <li>• Optimize irrigation</li>
                  <li>• Monitor soil moisture</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-orange-900 mb-2 text-sm">⚠️ Quick Response</h3>
                <ul className="text-xs text-orange-800 space-y-1">
                  <li>• Stop irrigation</li>
                  <li>• Open drainage</li>
                  <li>• Use pumps if available</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* No Waterlogging Data State */}
        {!waterloggingLoading && !riskData && !waterloggingError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center"
          >
            <Droplets className="text-blue-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Waterlogging Detection System</h3>
            <p className="text-blue-800 text-sm">
              Waiting for sensor data... Make sure your devices are connected and sending data to the system.
            </p>
          </motion.div>
        )}
        </motion.div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${isSensorLive ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
            <div>
              <p className="text-sm text-gray-600">System Status</p>
              <p className="font-semibold text-nature-forest">{isSensorLive ? 'Sensor Feed Live' : 'Waiting for Live Sensor Feed'}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4">
            <AlertCircle className="text-amber-500 flex-shrink-0" size={24} />
            <div>
              <p className="text-sm text-gray-600">Last Update</p>
              <p className="font-semibold text-nature-forest text-sm">{lastUpdateLabel}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
