'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Droplets, AlertCircle } from 'lucide-react'
import { RiskLevel, getRiskColor, getRiskBgColor, getRiskBorderColor } from '@/lib/waterlogging'

interface WaterloggingAlertProps {
  riskLevel: RiskLevel
  message: string
  show?: boolean
}

export function WaterloggingAlert({ riskLevel, message, show = true }: WaterloggingAlertProps) {
  if (!show) return null

  const isHighRisk = riskLevel === 'HIGH'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        border-2 rounded-lg p-4 mb-6
        ${getRiskBgColor(riskLevel)} ${getRiskBorderColor(riskLevel)}
      `}
    >
      <div className="flex items-start gap-3">
        {isHighRisk ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          </motion.div>
        ) : (
          <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-0.5`} style={{ color: getRiskColor(riskLevel) }} />
        )}
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${riskLevel === 'HIGH' ? 'text-red-700' : riskLevel === 'MEDIUM' ? 'text-orange-700' : 'text-green-700'}`}>
            {riskLevel === 'HIGH' ? '⚠️ High Waterlogging Risk Detected' : riskLevel === 'MEDIUM' ? '⚠️ Medium Waterlogging Risk' : '✅ Waterlogging Status: Safe'}
          </h3>
          <p className={`text-sm mt-1 ${riskLevel === 'HIGH' ? 'text-red-600' : riskLevel === 'MEDIUM' ? 'text-orange-600' : 'text-green-600'}`}>
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
