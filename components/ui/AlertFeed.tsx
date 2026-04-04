'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Bell, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Alert {
  id: string | number
  type: 'warning' | 'critical' | 'info'
  message: string
  timestamp: Date
}

interface AlertFeedProps {
  alerts: Alert[]
  sticky?: boolean
  className?: string
  onDelete?: (id: string | number) => Promise<void> | void
}

export function AlertFeed({ alerts: initialAlerts, sticky = true, className = '', onDelete }: AlertFeedProps) {
  const [alerts, setAlerts] = useState(initialAlerts)

  useEffect(() => {
    setAlerts(initialAlerts)
  }, [initialAlerts])

  const removeAlert = async (id: string | number) => {
    if (onDelete) {
      await onDelete(id)
      return
    }

    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-300 bg-red-50'
      case 'warning':
        return 'border-amber-300 bg-amber-50'
      default:
        return 'border-blue-300 bg-blue-50'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-red-600'
      case 'warning':
        return 'text-amber-600'
      default:
        return 'text-blue-600'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className={`glass-card p-6 ${sticky ? 'sticky top-20 md:top-8' : ''} ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-nature-forest" size={24} />
        <h2 className="text-xl font-bold text-nature-forest">Alerts Feed</h2>
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`border-l-4 rounded-lg p-3 space-y-1 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <AlertCircle className={`${getAlertIcon(alert.type)} flex-shrink-0 mt-0.5`} size={16} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 break-words">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {formatTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => void removeAlert(alert.id)}
                    className="flex-shrink-0 p-1 hover:bg-black/10 rounded-lg transition"
                    aria-label="Remove alert"
                  >
                    <X size={14} className="text-gray-600" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Bell size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No alerts</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
