'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type MoisturePoint = {
  time: string
  moisture: number
}

type MoistureChartProps = {
  data: MoisturePoint[]
}

export function MoistureChart({ data }: MoistureChartProps) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2D5A27" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
            label={{ value: 'Moisture %', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ stroke: '#2D5A27', strokeDasharray: '5 5' }}
          />
          <Area
            type="monotone"
            dataKey="moisture"
            stroke="#2D5A27"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMoisture)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
