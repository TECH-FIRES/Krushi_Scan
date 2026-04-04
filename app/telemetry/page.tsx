'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadioTower, Code, Copy, CheckCircle } from 'lucide-react'

interface IoTNode {
  id: string
  name: string
  status: 'online' | 'offline'
  lastUpdate: string
  data: Record<string, any>
}

type GetDataResponse = {
  soil: number | string
  air: number | string
  hum: number | string
  water: number | string
  timestamp: string | null
  history?: Array<{ soil: number; air: number; hum: number; water: number; timestamp: string }>
}

const SINGLE_NODE_ID = 'ESP32-001'
const SINGLE_NODE_NAME = 'Field Sensor'

const asNumber = (value: unknown): number | null => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export default function TelemetryPage() {
  const [selectedNode, setSelectedNode] = useState<IoTNode | null>(null)
  const [nodes, setNodes] = useState<IoTNode[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const rawDataPreview = selectedNode
    ? {
        soilMoisture: selectedNode.data?.sensors?.soilMoisture,
        temperature: selectedNode.data?.sensors?.temperature,
        humidity: selectedNode.data?.sensors?.humidity,
      }
    : null

  const handleCopyJson = () => {
    if (selectedNode && rawDataPreview) {
      navigator.clipboard.writeText(JSON.stringify(rawDataPreview, null, 2))
      setCopiedId(selectedNode.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  useEffect(() => {
    let mounted = true

    const fetchSensorNode = async () => {
      try {
        const response = await fetch('/api/getdata?limit=20', { cache: 'no-store' })
        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as GetDataResponse
        if (!mounted) {
          return
        }

        const soil = asNumber(payload.soil)
        const air = asNumber(payload.air)
        const hum = asNumber(payload.hum)
        const water = asNumber(payload.water)
        const timestamp = payload.timestamp || new Date().toISOString()
        const isOnline = !!payload.timestamp && Date.now() - new Date(payload.timestamp).getTime() < 20000

        const node: IoTNode = {
          id: SINGLE_NODE_ID,
          name: SINGLE_NODE_NAME,
          status: isOnline ? 'online' : 'offline',
          lastUpdate: timestamp,
          data: {
            sensors: {
              temperature: air ?? '--',
              humidity: hum ?? '--',
              soilMoisture: soil ?? '--',
              waterTemperature: water ?? '--',
            },
            source: 'Flask Bridge',
            history: Array.isArray(payload.history) ? payload.history : [],
          },
        }

        setNodes([node])
        setSelectedNode(node)
      } catch (error) {
        // Keep previous node data if polling fails.
      }
    }

    fetchSensorNode()
    const interval = setInterval(fetchSensorNode, 2000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-nature-sage p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-nature-forest mb-2 flex items-center gap-3">
          <RadioTower size={40} />
          Field Sensors
        </h1>
        <p className="text-gray-600">Monitor real-time data from ESP32 sensor nodes</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nodes List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-6 sticky top-8">
            <h2 className="text-xl font-bold text-nature-forest mb-4">Connected Nodes</h2>
            <div className="space-y-2">
              {nodes.map((node, index) => (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-xl transition-all text-left ${
                    selectedNode?.id === node.id
                      ? 'bg-nature-forest text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{node.name}</h3>
                      <p className="text-xs opacity-75 font-mono">{node.id}</p>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full mt-1 ${
                        node.status === 'online'
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <p className={`text-xs ${selectedNode?.id === node.id ? 'opacity-75' : 'text-gray-600'}`}>
                    {node.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Nodes</span>
                    <span className="font-bold text-nature-forest">{nodes.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Online</span>
                <span className="font-bold text-green-600">
                  {nodes.filter((n) => n.status === 'online').length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Offline</span>
                <span className="font-bold text-red-600">
                  {nodes.filter((n) => n.status === 'offline').length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data View */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Node Header */}
                <div className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-nature-forest mb-2">
                        {selectedNode.name}
                      </h2>
                      <p className="text-sm text-gray-600 font-mono">{selectedNode.id}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedNode.status === 'online'
                              ? 'bg-green-500 animate-pulse'
                              : 'bg-red-500'
                          }`}
                        />
                        <span className="font-semibold">
                          {selectedNode.status === 'online' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Last update: {formatDate(selectedNode.lastUpdate)}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Temperature</p>
                      <p className="text-lg font-bold text-orange-700">
                        {selectedNode.data.sensors.temperature}°C
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Humidity</p>
                      <p className="text-lg font-bold text-green-700">
                        {selectedNode.data.sensors.humidity}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* All Sensors Breakdown */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-nature-forest mb-4">Sensor Readings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedNode.data.sensors)
                      .filter(([key]) => key !== 'waterTemperature')
                      .map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-3 text-center"
                      >
                        <p className="text-xs text-gray-600 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className="text-lg font-bold text-nature-forest">
                          {typeof value === 'number' ? (value as number).toFixed(1) : String(value)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* JSON Data View */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Code size={24} className="text-nature-forest" />
                      <h3 className="text-lg font-bold text-nature-forest">Raw Data</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyJson}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
                      >
                        {copiedId === selectedNode.id ? (
                          <>
                            <CheckCircle size={16} className="text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* JSON Display */}
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 font-mono text-sm">
                      {JSON.stringify(rawDataPreview, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <RadioTower size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Node Selected</h3>
                <p className="text-gray-600">Select a node from the list to view its telemetry data</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
