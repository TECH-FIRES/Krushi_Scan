import { useState, useEffect, useCallback } from 'react'
import type { RiskLevel } from '@/lib/waterlogging'

export interface WaterloggingData {
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

export interface UseWaterloggingReturn {
  data: WaterloggingData | null
  history: Array<any>
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useWaterlogging(): UseWaterloggingReturn {
  const [data, setData] = useState<WaterloggingData | null>(null)
  const [history, setHistory] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [riskRes, historyRes] = await Promise.all([
        fetch('/api/waterlogging-risk'),
        fetch('/api/waterlogging-risk/history?days=7'),
      ])

      if (!riskRes.ok) throw new Error('Failed to fetch waterlogging data')

      const riskData = await riskRes.json()
      setData(riskData)

      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setHistory(historyData.data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()

    // Auto-refresh every 5 minutes
    const interval = setInterval(refetch, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refetch])

  return { data, history, loading, error, refetch }
}
