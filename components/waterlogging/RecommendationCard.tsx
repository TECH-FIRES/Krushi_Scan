'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Lightbulb, Droplets } from 'lucide-react'

interface RecommendationCardProps {
  recommendation: string
  cropRisk: string
  drainageSuggestion: string
}

export function RecommendationCard({
  recommendation,
  cropRisk,
  drainageSuggestion,
}: RecommendationCardProps) {
  const getReco = (reco: string) => {
    if (reco.includes('URGENT') || reco.includes('CRITICAL')) {
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    } else if (reco.includes('High')) {
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    } else {
      return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    }
  }

  const recoStyle = getReco(recommendation)

  return (
    <div className="space-y-4">
      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`border-2 rounded-lg p-4 ${recoStyle.bg} ${recoStyle.border}`}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className={`w-5 h-5 ${recoStyle.text} flex-shrink-0 mt-0.5`} />
          <div>
            <h4 className={`font-semibold ${recoStyle.text} mb-1`}>AI Recommendation</h4>
            <p className={`text-sm ${recoStyle.text}`}>{recommendation}</p>
          </div>
        </div>
      </motion.div>

      {/* Crop Risk */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className={`border-2 rounded-lg p-4 ${
          cropRisk.includes('CRITICAL') || cropRisk.includes('HIGH')
            ? 'bg-red-50 border-red-200'
            : cropRisk.includes('MEDIUM')
              ? 'bg-orange-50 border-orange-200'
              : 'bg-green-50 border-green-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className={`w-5 h-5 ${
              cropRisk.includes('CRITICAL') || cropRisk.includes('HIGH')
                ? 'text-red-700'
                : cropRisk.includes('MEDIUM')
                  ? 'text-orange-700'
                  : 'text-green-700'
            } flex-shrink-0 mt-0.5`}
          />
          <div>
            <h4
              className={`font-semibold ${
                cropRisk.includes('CRITICAL') || cropRisk.includes('HIGH')
                  ? 'text-red-700'
                  : cropRisk.includes('MEDIUM')
                    ? 'text-orange-700'
                    : 'text-green-700'
              } mb-1`}
            >
              Crop Risk Assessment
            </h4>
            <p
              className={`text-sm ${
                cropRisk.includes('CRITICAL') || cropRisk.includes('HIGH')
                  ? 'text-red-700'
                  : cropRisk.includes('MEDIUM')
                    ? 'text-orange-700'
                    : 'text-green-700'
              }`}
            >
              {cropRisk}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Drainage Suggestion */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50"
      >
        <div className="flex items-start gap-3">
          <Droplets className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-700 mb-1">Drainage Action Plan</h4>
            <p className="text-sm text-blue-700">{drainageSuggestion}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
