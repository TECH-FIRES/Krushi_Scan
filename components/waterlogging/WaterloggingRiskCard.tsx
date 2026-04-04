'use client'

import { motion } from 'framer-motion'
import { getRiskColor, getRiskBgColor, RiskLevel } from '@/lib/waterlogging'

interface RiskCardProps {
  riskLevel: RiskLevel
  score: number
}

export function WaterloggingRiskCard({ riskLevel, score }: RiskCardProps) {
  const riskLabels = {
    LOW: { label: 'Low Risk', emoji: '🟢' },
    MEDIUM: { label: 'Medium Risk', emoji: '🟠' },
    HIGH: { label: 'High Risk', emoji: '🔴' },
  }

  const risk = riskLabels[riskLevel]
  const colors = {
    LOW: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    MEDIUM: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    HIGH: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  }

  const color = colors[riskLevel]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        border-2 rounded-lg p-6 ${color.bg} ${color.border}
        relative overflow-hidden
      `}
    >
      {/* Background animation */}
      {riskLevel === 'HIGH' && (
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-red-400 to-transparent pointer-events-none"
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-2xl font-bold ${color.text}`}>{risk.emoji} {risk.label}</h3>
          <div className={`text-4xl font-bold ${color.text}`}>{score}</div>
        </div>

        {/* Risk score bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-semibold ${color.text}`}>Risk Score</span>
            <span className={`text-xs ${color.text}`}>{score}%</span>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-current border-opacity-20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full"
              style={{ backgroundColor: getRiskColor(riskLevel) }}
            />
          </div>
        </div>

        {/* Risk interpretation */}
        <div className={`mt-4 pt-4 border-t-2 border-current border-opacity-20`}>
          <p className={`text-xs font-semibold ${color.text} uppercase tracking-wide`}>
            {riskLevel === 'HIGH' && 'Immediate action required'}
            {riskLevel === 'MEDIUM' && 'Monitor and plan preventative measures'}
            {riskLevel === 'LOW' && 'Conditions are optimal'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
