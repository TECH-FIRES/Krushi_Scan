'use client'

import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Cloud, Droplet, Leaf, DollarSign, PlusCircle, BarChart3, 
  AlertTriangle, Wind, Zap, Target, TrendingUp
} from 'lucide-react'
import { cropsDatabase } from '@/lib/cropsDatabase'

interface Props {
  params: Promise<{
    cropId: string
  }>
}

export default function CropDetailPage({ params }: Props) {
  const { cropId } = use(params)
  const crop = cropsDatabase.find(c => c.id === cropId)

  if (!crop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Crop Not Found</h1>
          <p className="text-gray-600 mb-6">The crop you're looking for doesn't exist.</p>
          <Link
            href="/crops"
            className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <ArrowLeft size={20} />
            Back to Crops
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
          <Link
            href="/crops"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-gray-600" size={24} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-nature-forest">{crop.name}</h1>
            <p className="text-gray-600">{crop.cropType}</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Section with Image */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg h-96">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-nature-forest mb-4">Quick Overview</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Crop Type</p>
                    <p className="text-lg font-semibold text-gray-800">{crop.cropType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Climate Requirements</p>
                    <p className="text-lg font-semibold text-gray-800">{crop.climateRequirements}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Soil Type</p>
                    <p className="text-lg font-semibold text-gray-800">{crop.soilType}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Leaf className="text-green-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-nature-forest">Benefits of Growing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crop.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="text-green-600 flex-shrink-0 mt-1">✓</div>
                  <p className="text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Growing Profile */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Cloud className="text-blue-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-nature-forest">Growing Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(crop.growingProfile).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <p className="text-sm font-semibold text-blue-900 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-gray-700">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profitability Analysis */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="text-yellow-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-nature-forest">Profitability Analysis</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(crop.profitMargin).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <p className="text-sm font-semibold text-yellow-900 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">{value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Market Demand</h3>
              <p className="text-gray-700">{crop.marketDemand}</p>
            </div>
          </motion.div>

          {/* Fertilizer Suggestions */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="text-green-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-nature-forest">Fertilizer Suggestions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(crop.fertiliserSuggestions).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <p className="font-semibold text-green-900 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-gray-700">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pest & Disease Management */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-nature-forest">Pest & Disease Management</h2>
            </div>
            <div className="space-y-3">
              {crop.pestDiseases.map((disease, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 p-4 bg-red-50 rounded-lg border border-red-200"
                >
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
                  <p className="text-gray-700">{disease}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Uses & Benefits */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
          >
            <h2 className="text-2xl font-bold text-nature-forest mb-4">Uses & Benefits</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{crop.usesAndBenefits}</p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Grow {crop.name}?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Use the latest agricultural practices, monitor your crops with IoT sensors, and get personalized recommendations for maximum yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                <BarChart3 size={20} />
                View Dashboard
              </Link>
              <Link
                href="/scan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition border border-white"
              >
                <Leaf size={20} />
                Scan Your Farm
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
