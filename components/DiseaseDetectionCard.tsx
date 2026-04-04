'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Droplets, Sun, Leaf, Sprout } from 'lucide-react'

// ========== TYPE DEFINITIONS ==========

interface DiseaseResult {
  disease: string
  confidence: number
  treatment: string
  type?: string
  requirements?: {
    soil: string
    water: string
    sunlight: string
    fertilizer: string
    harvest: string
  }
}

interface DiseaseDetectionCardProps {
  result: DiseaseResult
  imageUrl?: string
  onSave?: () => void
  onAnalyzeAnother?: () => void
  isLoading?: boolean
}

// ========== ANIMATION VARIANTS ==========

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

const confidenceVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const badgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

// ========== COMPONENT ==========

export default function DiseaseDetectionCard({
  result,
  imageUrl,
  onSave,
  onAnalyzeAnother,
  isLoading = false,
}: DiseaseDetectionCardProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* ========== HEADER SECTION ==========*/}
      <motion.div
        variants={itemVariants}
        className="glass-leaf-card-premium p-8 md:p-10 mb-6"
      >
        {/* Success Indicator */}
        <motion.div
          variants={badgeVariants}
          className="flex items-center gap-2 mb-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CheckCircle
              size={28}
              className="text-sage-400"
              strokeWidth={1.5}
            />
          </motion.div>
          <span className="font-serif-display text-lg font-bold text-forest-700">
            Analysis Complete
          </span>
        </motion.div>

        {/* Main Result */}
        <motion.h2
          variants={itemVariants}
          className="font-serif-display text-3xl md:text-4xl font-bold text-forest-700 mb-2"
        >
          {result.disease}
        </motion.h2>

        {/* Confidence Score Section */}
        <motion.div variants={itemVariants} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-stone-600">Confidence Score</span>
            <motion.span
              variants={badgeVariants}
              className="badge-confidence"
            >
              {Math.round(result.confidence)}%
            </motion.span>
          </div>

          {/* Confidence Bar with Animated Fill */}
          <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              variants={confidenceVariants}
              style={{
                width: `${result.confidence}%`,
              }}
              className={`h-full rounded-full bg-gradient-to-r from-sage-400 to-forest-700 shadow-lg`}
            />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ========== IMAGE & OVERVIEW SECTION ==========*/}
      {imageUrl && (
        <motion.div
          variants={itemVariants}
          className="glass-soil-card p-6 mb-6 overflow-hidden"
        >
          <motion.img
            src={imageUrl}
            alt="Analyzed plant"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-full h-48 object-cover rounded-2xl"
          />
        </motion.div>
      )}

      {/* Overview Section */}
      <motion.div
        variants={itemVariants}
        className="glass-leaf-card p-8 mb-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-start gap-3 mb-4"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Leaf size={24} className="text-forest-700 flex-shrink-0" />
          </motion.div>
          <div>
            <h3 className="font-serif-display text-xl font-bold text-forest-700 mb-2">
              Overview
            </h3>
            <p className="text-stone-700 leading-relaxed">
              {result.treatment}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ========== REQUIREMENTS SECTION (4-COLUMN GRID) ==========*/}
      {result.requirements && (
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="font-serif-display text-2xl font-bold text-forest-700 mb-4">
            Growing Requirements
          </h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Soil Requirement */}
            <RequirementCard
              icon={<Sprout size={24} className="text-soil-400" />}
              label="Soil"
              value={result.requirements.soil}
              color="soil"
            />

            {/* Water Requirement */}
            <RequirementCard
              icon={<Droplets size={24} className="text-sage-400" />}
              label="Water"
              value={result.requirements.water}
              color="sage"
            />

            {/* Sunlight Requirement */}
            <RequirementCard
              icon={<Sun size={24} className="text-harvest-400" />}
              label="Sunlight"
              value={result.requirements.sunlight}
              color="harvest"
            />

            {/* Fertilizer Requirement */}
            <RequirementCard
              icon={<Leaf size={24} className="text-forest-700" />}
              label="Fertilizer"
              value={result.requirements.fertilizer}
              color="forest"
            />
          </motion.div>
        </motion.div>
      )}

      {/* ========== ACTION BUTTONS SECTION ==========*/}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-stone-200"
      >
        {/* Save Report Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          onClick={onSave}
          disabled={isLoading}
          className="flex-1 btn-organic primary gap-2"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </motion.svg>
          <span>Save Report</span>
        </motion.button>

        {/* Analyze Another Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          onClick={onAnalyzeAnother}
          disabled={isLoading}
          className="flex-1 btn-organic secondary"
        >
          Analyze Another
        </motion.button>
      </motion.div>

      {/* ========== LOADING STATE OVERLAY ==========*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
        className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center"
      >
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-3 border-forest-700/20 border-t-forest-700 rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ========== REQUIREMENT CARD SUBCOMPONENT ==========

interface RequirementCardProps {
  icon: React.ReactNode
  label: string
  value: string
  color: 'soil' | 'sage' | 'harvest' | 'forest'
}

const RequirementCard: React.FC<RequirementCardProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  const colorClasses = {
    soil: 'glass-soil-card border-amber-200/50',
    sage: 'glass-leaf-card border-sage-300/50',
    harvest: 'bg-gradient-to-br from-amber-50 to-amber-100/50 border border-harvest-300/50',
    forest: 'glass-leaf-card border-forest-300/30',
  }

  return (
    <motion.div
      variants={badgeVariants}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`${colorClasses[color]} p-5 rounded-2xl backdrop-blur-md transition-all`}
    >
      <motion.div
        whileHover={{ rotate: 8, scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="mb-3"
      >
        {icon}
      </motion.div>

      <h4 className="font-serif-display text-sm font-bold text-forest-700 mb-2">
        {label}
      </h4>

      <p className="text-xs text-stone-700 leading-snug line-clamp-3">
        {value}
      </p>
    </motion.div>
  )
}

// ========== EXAMPLE USAGE ==========

export function DiseaseDetectionExample() {
  const mockResult: DiseaseResult = {
    disease: 'Early Blight (Alternaria solani)',
    confidence: 89,
    treatment:
      'Remove affected leaves and improve air circulation. Apply fungicide like chlorothalonil every 7-10 days. Avoid overhead watering.',
    requirements: {
      soil: 'Well-draining loamy soil with pH 6.0-6.8',
      water: 'Consistent moisture, 1-1.5 inches per week',
      sunlight: 'Full sun, 6-8 hours daily for best results',
      fertilizer: 'Balanced NPK monthly during growing season',
      harvest: '60-85 days from transplanting',
    },
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <DiseaseDetectionCard
          result={mockResult}
          imageUrl="https://via.placeholder.com/600x400?text=Tomato+Leaf+Disease"
          onSave={() => alert('Report saved!')}
          onAnalyzeAnother={() => alert('Ready for another analysis')}
        />
      </div>
    </div>
  )
}
