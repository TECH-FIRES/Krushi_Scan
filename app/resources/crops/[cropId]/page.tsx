'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Sun, TrendingUp, DollarSign, AlertCircle, Zap, ChevronDown, Camera, Lightbulb } from 'lucide-react'
import { cropsDatabase } from '@/lib/cropsDatabase'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function CropDetailPage() {
  const params = useParams()
  const cropId = params.cropId as string
  const [expandedAction, setExpandedAction] = useState<string | null>(null)
  
  const crop = cropsDatabase.find(c => c.id === cropId)

  if (!crop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-nature-forest mb-4">Crop Not Found</h1>
          <Link href="/resources">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-electric-400 text-white rounded-full font-bold"
            >
              ← Back to Resources
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 pb-24">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/resources">
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-nature-forest" />
            </motion.button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-nature-forest">{crop.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{crop.cropType}</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Image Section - Full Width */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[500px] bg-gradient-to-br from-spring-400 to-electric-400"
          >
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay with crop name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{crop.name}</h2>
                <p className="text-white/90 text-lg mt-2">{crop.cropType}</p>
              </div>
            </div>
          </motion.div>

          {/* Two Column Layout - Content + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Climate & Soil Requirements */}
              <motion.div variants={itemVariants} className="card-bento-sky p-8 rounded-2xl shadow-lg border border-sky-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-sky-400/20 rounded-xl">
                    <Sun size={28} className="text-sky-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-nature-forest">Climate & Soil Requirements</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-6 rounded-xl backdrop-blur-sm">
                    <p className="font-bold text-nature-forest mb-3 text-lg">🌡️ Climate Requirements</p>
                    <p className="text-gray-700 leading-relaxed">{crop.climateRequirements}</p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-xl backdrop-blur-sm">
                    <p className="font-bold text-nature-forest mb-3 text-lg">🌍 Soil Type</p>
                    <p className="text-gray-700 leading-relaxed">{crop.soilType}</p>
                  </div>
                </div>
              </motion.div>

              {/* Growing Profile */}
              <motion.div variants={itemVariants} className="card-bento-mint p-8 rounded-2xl shadow-lg border border-mint-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-electric-400/20 rounded-xl">
                    <Leaf size={28} className="text-electric-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-nature-forest">Growing Profile</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Season</p>
                      <p className="text-lg font-bold text-nature-forest mt-1">{crop.growingProfile.season}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Duration</p>
                      <p className="text-lg font-bold text-nature-forest mt-1">{crop.growingProfile.duration}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Temperature</p>
                      <p className="text-lg font-bold text-nature-forest mt-1">{crop.growingProfile.temperature}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Rainfall</p>
                      <p className="text-lg font-bold text-nature-forest mt-1">{crop.growingProfile.rainfall}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Land Preparation</p>
                      <p className="text-sm text-gray-700 mt-1">{crop.growingProfile.landPreparation}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Sowing Method</p>
                      <p className="text-sm text-gray-700 mt-1">{crop.growingProfile.sowingMethod}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Spacing</p>
                      <p className="text-sm text-gray-700 mt-1">{crop.growingProfile.spacing}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Irrigation</p>
                      <p className="text-sm text-gray-700 mt-1">{crop.growingProfile.irrigationNeeds}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-sm font-bold text-gray-600 uppercase">Harvesting Age</p>
                      <p className="text-sm text-gray-700 mt-1">{crop.growingProfile.harvestingAge}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fertilizer Suggestions */}
              <motion.div variants={itemVariants} className="card-bento-butter p-8 rounded-2xl shadow-lg border border-butter-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-solar-400/20 rounded-xl">
                    <Zap size={28} className="text-solar-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-nature-forest">Fertilizer Suggestions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-xl border border-blue-200/50">
                    <p className="font-bold text-nature-forest mb-2 text-lg">Nitrogen (N)</p>
                    <p className="text-sm text-gray-700">{crop.fertiliserSuggestions.nitrogen}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-xl border border-green-200/50">
                    <p className="font-bold text-nature-forest mb-2 text-lg">Phosphorus (P)</p>
                    <p className="text-sm text-gray-700">{crop.fertiliserSuggestions.phosphorus}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-5 rounded-xl border border-purple-200/50">
                    <p className="font-bold text-nature-forest mb-2 text-lg">Potassium (K)</p>
                    <p className="text-sm text-gray-700">{crop.fertiliserSuggestions.potassium}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-5 rounded-xl border border-amber-200/50">
                    <p className="font-bold text-nature-forest mb-2 text-lg">Organic Matter</p>
                    <p className="text-sm text-gray-700">{crop.fertiliserSuggestions.organic}</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-100 to-rose-50 p-5 rounded-xl border border-rose-200/50 md:col-span-2">
                    <p className="font-bold text-nature-forest mb-2 text-lg">Micronutrients</p>
                    <p className="text-sm text-gray-700">{crop.fertiliserSuggestions.micronutrients}</p>
                  </div>
                </div>
              </motion.div>

              {/* Pest & Disease Management */}
              <motion.div variants={itemVariants} className="card-bento-rose p-8 rounded-2xl shadow-lg border border-rose-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-400/20 rounded-xl">
                    <AlertCircle size={28} className="text-red-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-nature-forest">Pest & Disease Management</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {crop.pestDiseases.map((disease, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-red-100/50">
                      <span className="text-red-500 font-bold text-xl flex-shrink-0">⚠️</span>
                      <p className="text-sm text-gray-700">{disease}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Uses & Benefits */}
              <motion.div variants={itemVariants} className="card-bento-lavender p-8 rounded-2xl shadow-lg border border-lavender-200/50">
                <h2 className="text-2xl md:text-3xl font-bold text-nature-forest mb-6 flex items-center gap-3">✨ Uses & Health Benefits</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{crop.usesAndBenefits}</p>
              </motion.div>
            </div>

            {/* Sidebar - Profit & Market */}
            <div className="space-y-6">
              {/* Profit Analysis Card */}
              <motion.div variants={itemVariants} className="card-bento-peach p-6 rounded-2xl shadow-lg border border-peach-200/50 sticky top-24">
                <div className="flex items-center gap-3 mb-5">
                  <DollarSign size={26} className="text-juicy-500" />
                  <h2 className="text-xl font-bold text-nature-forest">Profit Analysis</h2>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-600 font-bold uppercase">Cost per Acre</p>
                    <p className="text-2xl font-bold text-nature-forest mt-1">{crop.profitMargin.costPerAcre}</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-600 font-bold uppercase">Expected Yield</p>
                    <p className="text-2xl font-bold text-nature-forest mt-1">{crop.profitMargin.yieldPerAcre}</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-xs text-gray-600 font-bold uppercase">Market Price</p>
                    <p className="text-2xl font-bold text-nature-forest mt-1">{crop.profitMargin.marketPrice}</p>
                  </div>
                  <div className="bg-gradient-to-br from-juicy-400 via-juicy-350 to-juicy-300 p-5 rounded-lg text-white shadow-md">
                    <p className="text-xs font-bold uppercase opacity-95">Net Profit Per Acre</p>
                    <p className="text-3xl font-bold mt-2">{crop.profitMargin.netProfit}</p>
                  </div>
                </div>
              </motion.div>

              {/* Market Demand Card */}
              <motion.div variants={itemVariants} className="card-bento-sky p-6 rounded-2xl shadow-lg border border-sky-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} className="text-sky-500" />
                  <h2 className="text-xl font-bold text-nature-forest">Market Demand</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{crop.marketDemand}</p>
              </motion.div>

              {/* Key Benefits */}
              <motion.div variants={itemVariants} className="card-bento-mint p-6 rounded-2xl shadow-lg border border-mint-200/50">
                <h2 className="text-xl font-bold text-nature-forest mb-4">✨ Key Benefits</h2>
                <ul className="space-y-3">
                  {crop.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-electric-400 font-bold flex-shrink-0 text-lg">•</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Actions Dropdown */}
              <motion.div variants={itemVariants} className="card-bento-electric rounded-2xl shadow-lg border border-electric-200/50 overflow-hidden">
                <button
                  onClick={() => setExpandedAction(expandedAction === 'actions' ? null : 'actions')}
                  className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-electric-400 to-electric-350 hover:from-electric-500 hover:to-electric-400 text-white font-bold transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <Camera size={20} />
                    Scan & Actions
                  </span>
                  <motion.div
                    animate={{ rotate: expandedAction === 'actions' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedAction === 'actions' ? 'auto' : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
                    <Link href="/scan" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-4 bg-gradient-to-r from-electric-400 to-electric-500 text-white rounded-xl font-bold hover:shadow-lg transition-all text-center"
                      >
                        📸 Scan Your Farm
                      </motion.button>
                    </Link>
                    <p className="text-xs text-gray-600 text-center">
                      Use AI-powered image recognition to identify crops and soil conditions
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Intelligence Dropdown */}
              <motion.div variants={itemVariants} className="card-bento-sky rounded-2xl shadow-lg border border-sky-200/50 overflow-hidden">
                <button
                  onClick={() => setExpandedAction(expandedAction === 'intelligence' ? null : 'intelligence')}
                  className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-sky-400 to-sky-350 hover:from-sky-500 hover:to-sky-400 text-white font-bold transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <Lightbulb size={20} />
                    Smart Intelligence
                  </span>
                  <motion.div
                    animate={{ rotate: expandedAction === 'intelligence' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedAction === 'intelligence' ? 'auto' : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
                    <Link href="/intelligence" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-xl font-bold hover:shadow-lg transition-all text-center"
                      >
                        💡 Get AI Recommendations
                      </motion.button>
                    </Link>
                    <p className="text-xs text-gray-600 text-center">
                      Receive personalized farming recommendations based on weather, soil, and crop data
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
