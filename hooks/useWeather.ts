'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
  region: string
  temperature: number
  humidity: number
  windSpeed: number
  rainfall: number
  condition: string
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
  }>
}

export function useWeather(state?: string, district?: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!state || !district) return

    let isMounted = true

    const fetchWeather = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/weather?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather')
        }

        const data = await response.json()
        if (isMounted) {
          setWeather(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchWeather()

    return () => {
      isMounted = false
    }
  }, [state, district])

  return { weather, loading, error }
}
