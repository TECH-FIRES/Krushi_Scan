'use client'

import { useState, useEffect } from 'react'

interface IoTNode {
  id: string
  name: string
  status: 'online' | 'offline'
  lastUpdate: string
  data: Record<string, any>
}

export function useIoTData() {
  const [nodes] = useState<IoTNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        // In a real app, this would fetch from /api/sensors
        // For now, we're using mock data
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoading(false)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { nodes, loading, error }
}
