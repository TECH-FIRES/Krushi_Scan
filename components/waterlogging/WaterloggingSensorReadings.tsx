'use client'

import { motion } from 'framer-motion'
import { Droplets, Cloud, Thermometer } from 'lucide-react'

interface SensorCardProps {
  icon: React.ReactNode
  label: string
  value: number
  unit: string
  color: string
  optimal?: { min: number; max: number }
}

function SensorCard({ icon, label, value, unit, color, optimal }: SensorCardProps) {
  const isOptimal = optimal ? value >= optimal.min && value <= optimal.max : false

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        border-2 rounded-lg p-4
        bg-white border-${color}-200
      `}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`text-${color}-600`}>{icon}</div>
        <h4 className="font-semibold text-gray-700">{label}</h4>
      </div>

      <div className={`text-3xl font-bold text-${color}-700 mb-2`}>
        {value.toFixed(1)} <span className="text-lg">{unit}</span>
      </div>

      {optimal && (
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${isOptimal ? `bg-${color}-500` : 'bg-yellow-500'}`} />
          <span className="text-xs text-gray-600">
            {isOptimal ? 'Optimal range' : `Optimal: ${optimal.min}-${optimal.max}${unit}`}
          </span>
        </div>
      )}
    </motion.div>
  )
}

interface SensorReadingsProps {
  soilMoisture: number
  humidity: number
  temperature: number
}

export function WaterloggingSensorReadings({
  soilMoisture,
  humidity,
  temperature,
}: SensorReadingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SensorCard
        icon={<Droplets className="w-5 h-5" />}
        label="Soil Moisture"
        value={soilMoisture}
        unit="%"
        color="blue"
        optimal={{ min: 40, max: 70 }}
      />
      <SensorCard
        icon={<Cloud className="w-5 h-5" />}
        label="Humidity"
        value={humidity}
        unit="%"
        color="cyan"
        optimal={{ min: 50, max: 70 }}
      />
      <SensorCard
        icon={<Thermometer className="w-5 h-5" />}
        label="Temperature"
        value={temperature}
        unit="°C"
        color="orange"
        optimal={{ min: 20, max: 30 }}
      />
    </div>
  )
}
