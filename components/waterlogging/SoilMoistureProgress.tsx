'use client'

import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'

interface SoilMoistureProgressProps {
  value: number
}

export function SoilMoistureProgress({ value }: SoilMoistureProgressProps) {
  // Determine color zones
  let zoneColor = '#22c55e' // green
  let zoneLabel = 'Optimal'
  let zoneDescription = 'Good moisture level'

  if (value > 85) {
    zoneColor = '#ef4444' // red
    zoneLabel = 'Critical (Waterlogged)'
    zoneDescription = 'Immediate action needed'
  } else if (value > 80) {
    zoneColor = '#f97316' // orange
    zoneLabel = 'Above Optimal'
    zoneDescription = 'High waterlogging risk'
  } else if (value > 70) {
    zoneColor = '#fbbf24' // amber
    zoneLabel = 'Elevated'
    zoneDescription = 'Monitor closely'
  } else if (value < 30) {
    zoneColor = '#8b5cf6' // purple
    zoneLabel = 'Low'
    zoneDescription = 'Consider irrigation'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-blue-200 rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800">
          <Droplets className="w-5 h-5 text-blue-600" />
          Soil Moisture Level
        </h3>
        <div className="text-2xl font-bold text-blue-700">{value}%</div>
      </div>

      {/* Progress bar with zones */}
      <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
        {/* Zone indicators */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-purple-200 opacity-30" />
          <div className="flex-[1.5] bg-green-200 opacity-30" />
          <div className="flex-1 bg-amber-200 opacity-30" />
          <div className="flex-1 bg-orange-200 opacity-30" />
          <div className="flex-1 bg-red-200 opacity-30" />
        </div>

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full flex items-center justify-end pr-3"
          style={{ backgroundColor: zoneColor }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 bg-white rounded-full shadow-lg"
          />
        </motion.div>

        {/* Zone markers */}
        <div className="absolute inset-0 flex justify-between px-3 pointer-events-none">
          <div className="flex flex-col justify-center text-xs font-semibold text-gray-700">0</div>
          <div className="flex flex-col justify-center text-xs font-semibold text-gray-700">30</div>
          <div className="flex flex-col justify-center text-xs font-semibold text-gray-700">50</div>
          <div className="flex flex-col justify-center text-xs font-semibold text-gray-700">70</div>
          <div className="flex flex-col justify-center text-xs font-semibold text-gray-700">100</div>
        </div>
      </div>

      {/* Zone information */}
      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${zoneColor}20` }}>
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: zoneColor }}
        />
        <div>
          <p className="font-semibold" style={{ color: zoneColor }}>
            {zoneLabel}
          </p>
          <p className="text-xs text-gray-600">{zoneDescription}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-300 rounded-full" />
          <span className="text-gray-600">Dry (&lt;30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-300 rounded-full" />
          <span className="text-gray-600">Optimal (30-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-300 rounded-full" />
          <span className="text-gray-600">High (70-80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-300 rounded-full" />
          <span className="text-gray-600">Critical (&gt;80%)</span>
        </div>
      </div>
    </motion.div>
  )
}
