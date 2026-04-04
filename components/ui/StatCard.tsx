'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
  bgColor: string
  status?: 'optimal' | 'warning' | 'critical'
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  status = 'optimal',
  className = '',
}: StatCardProps) {
  const statusColor = {
    optimal: 'text-green-500',
    warning: 'text-amber-500',
    critical: 'text-red-500',
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card-hover glass-card p-6 cursor-pointer group ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
          <p className={`text-xs font-semibold uppercase ${statusColor[status]}`}>
            {status === 'optimal' && '✓ Optimal'}
            {status === 'warning' && '⚠ Warning'}
            {status === 'critical' && '✕ Critical'}
          </p>
        </div>
        <motion.div whileHover={{ rotate: 10 }} className={`${bgColor} p-3 rounded-xl`}>
          <Icon className={`${color}`} size={24} />
        </motion.div>
      </div>

      {/* Trend Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-500">
        <TrendingUp size={14} className="text-green-500" />
        <span>Trending up this hour</span>
      </div>
    </motion.div>
  )
}
