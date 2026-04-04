'use client'

import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

interface HistoryData {
  _id: string
  timestamp: string
  soil_moisture: number
  humidity: number
  temperature: number
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface RiskHistoryGraphProps {
  data: HistoryData[]
  loading?: boolean
}

export function RiskHistoryGraph({ data, loading }: RiskHistoryGraphProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg p-6 border-2 border-gray-200 h-80 flex items-center justify-center"
      >
        <div className="text-gray-500">Loading history...</div>
      </motion.div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg p-6 border-2 border-gray-200 h-80 flex items-center justify-center"
      >
        <div className="text-gray-500">No history data available yet</div>
      </motion.div>
    )
  }

  // Format data for charts
  const chartData = data
    .reverse()
    .map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      riskValue: item.risk_level === 'HIGH' ? 3 : item.risk_level === 'MEDIUM' ? 2 : 1,
    }))

  // Risk level colors
  const getRiskColor = (riskLevel: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (riskLevel) {
      case 'HIGH':
        return '#ef4444'
      case 'MEDIUM':
        return '#f97316'
      case 'LOW':
        return '#22c55e'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 border-2 border-gray-200"
    >
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Risk Level History</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            stroke="#666"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#666"
            tick={{ fontSize: 12 }}
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tickFormatter={(value) =>
              value === 0 ? '' : value === 1 ? 'LOW' : value === 2 ? 'MEDIUM' : 'HIGH'
            }
          />
          <YAxis
            yAxisId="right"
            stroke="#666"
            tick={{ fontSize: 12 }}
            orientation="right"
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #d0d0d0',
              borderRadius: '8px',
            }}
            formatter={(value, name) => {
              if (name === 'Risk') {
                const riskValue = value as number
                return [
                  riskValue === 1 ? 'LOW' : riskValue === 2 ? 'MEDIUM' : 'HIGH',
                  'Risk Level',
                ]
              }
              return [value, name]
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="riskValue"
            stroke="#8884d8"
            name="Risk Level"
            dot={(props) => {
              const data = chartData[props.index || 0]
              return (
                <circle
                  key={`risk-dot-${props.index}`}
                  cx={props.cx}
                  cy={props.cy}
                  r={5}
                  fill={getRiskColor(data?.risk_level || 'LOW')}
                  stroke="white"
                  strokeWidth={2}
                />
              )
            }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="soil_moisture"
            stroke="#82ca9d"
            name="Soil Moisture %"
            dot={{ r: 3 }}
            strokeWidth={2}
            yAxisId="right"
            opacity={0.7}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Sensor readings line chart */}
      <h3 className="font-semibold text-lg mb-4 mt-8 text-gray-800">Sensor Readings Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            stroke="#666"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#666" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #d0d0d0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="soil_moisture"
            stroke="#3b82f6"
            name="Soil Moisture %"
            dot={{ r: 4 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#06b6d4"
            name="Humidity %"
            dot={{ r: 4 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f97316"
            name="Temperature °C"
            dot={{ r: 4 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
