'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Droplets, ArrowRight } from 'lucide-react'
import { useWaterlogging } from '@/hooks/useWaterlogging'
import { getRiskBgColor, getRiskBorderColor, getRiskTextColor } from '@/lib/waterlogging'

export function WaterloggingDashboardWidget() {
  const { data, loading, error } = useWaterlogging()

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg border-2 border-gray-200 p-6 h-60 flex items-center justify-center"
      >
        <div className="text-gray-500">Loading waterlogging data...</div>
      </motion.div>
    )
  }

  if (error || !data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg border-2 border-gray-200 p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Waterlogging Status</h3>
        </div>
        <p className="text-sm text-gray-600">Unable to load waterlogging data</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border-2 rounded-lg p-6 ${getRiskBgColor(data.risk_level)} ${getRiskBorderColor(
        data.risk_level,
      )}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className={`w-6 h-6`} style={{ color: `var(--risk-color-${data.risk_level})` }} />
          <h3 className={`font-semibold text-lg ${getRiskTextColor(data.risk_level)}`}>Waterlogging Status</h3>
        </div>
        <div className={`text-2xl font-bold ${getRiskTextColor(data.risk_level)}`}>{data.risk_level}</div>
      </div>

      {/* Risk Score */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Risk Score</span>
          <span className={`text-sm font-bold ${getRiskTextColor(data.risk_level)}`}>{data.risk_score}%</span>
        </div>
        <div className="w-full h-2 bg-white rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.risk_score}%` }}
            transition={{ duration: 1 }}
            className={`h-full`}
            style={{
              backgroundColor:
                data.risk_level === 'HIGH'
                  ? '#ef4444'
                  : data.risk_level === 'MEDIUM'
                    ? '#f97316'
                    : '#22c55e',
            }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center py-2 bg-white/50 rounded">
          <div className="text-xs text-gray-600">Moisture</div>
          <div className="text-lg font-bold text-gray-800">{data.soil_moisture}%</div>
        </div>
        <div className="text-center py-2 bg-white/50 rounded">
          <div className="text-xs text-gray-600">Humidity</div>
          <div className="text-lg font-bold text-gray-800">{data.humidity}%</div>
        </div>
        <div className="text-center py-2 bg-white/50 rounded">
          <div className="text-xs text-gray-600">Temp</div>
          <div className="text-lg font-bold text-gray-800">{data.temperature}°C</div>
        </div>
      </div>

      {/* Status Message */}
      <p className={`text-sm mb-4 ${getRiskTextColor(data.risk_level)}`}>{data.soil_status}</p>

      {/* Quick Recommendation */}
      <div className={`bg-white/40 rounded px-3 py-2 mb-4 border-l-4`}
        style={{
          borderLeftColor:
            data.risk_level === 'HIGH'
              ? '#ef4444'
              : data.risk_level === 'MEDIUM'
                ? '#f97316'
                : '#22c55e',
        }}
      >
        <p className="text-xs font-semibold text-gray-700 mb-1">Quick Action</p>
        <p className="text-xs text-gray-700 line-clamp-2">{data.recommendation}</p>
      </div>

      {/* Link to Full Dashboard */}
      <Link href="/waterlogging">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-white transition-colors ${
            data.risk_level === 'HIGH'
              ? 'bg-red-600 hover:bg-red-700'
              : data.risk_level === 'MEDIUM'
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          View Full Dashboard <ArrowRight className="w-4 h-4" />
        </motion.button>
      </Link>
    </motion.div>
  )
}
