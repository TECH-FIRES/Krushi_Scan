'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Leaf, ChevronRight, ArrowLeft } from 'lucide-react'
import { cropsDatabase } from '@/lib/cropsDatabase'

export default function CropsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories sorted
  const categories = useMemo(() => {
    const cats = new Set(cropsDatabase.map(crop => crop.category))
    return Array.from(cats).sort()
  }, [])

  // Filter crops
  const filteredCrops = useMemo(() => {
    return cropsDatabase.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.cropType.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || crop.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Group crops by category
  const groupedCrops = useMemo(() => {
    const grouped: { [key: string]: typeof cropsDatabase } = {}
    filteredCrops.forEach(crop => {
      if (!grouped[crop.category]) {
        grouped[crop.category] = []
      }
      grouped[crop.category].push(crop)
    })
    return grouped
  }, [filteredCrops])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12 px-4 md:px-8 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </Link>
          <h1 className="text-4xl font-bold mb-2">Complete Crop Guide (A-Z)</h1>
          <p className="text-lg opacity-90">Explore detailed information on growing, profitability, and management of 50+ crops</p>
        </div>
      </motion.div>

      {/* Search & Filter Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search crops by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Letter</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-13 gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`py-2 px-3 rounded-lg font-semibold transition ${
                selectedCategory === null
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-gray-600"
        >
          <p>Showing <strong>{filteredCrops.length}</strong> crop(s)</p>
        </motion.div>

        {/* Crops Grid */}
        {Object.keys(groupedCrops).length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {Object.keys(groupedCrops).sort().map((category) => (
              <div key={category}>
                {/* Category Header */}
                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-bold text-nature-forest mb-6 pb-3 border-b-4 border-green-600 inline-block"
                >
                  {category}
                </motion.h2>

                {/* Crop Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {groupedCrops[category].map((crop) => (
                    <motion.div
                      key={crop.id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      {/* Crop Image */}
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=' + crop.name
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {crop.cropType.split('-')[0]}
                        </div>
                      </div>

                      {/* Crop Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-nature-forest mb-2">{crop.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{crop.cropType}</p>

                        {/* Quick Stats */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Leaf size={16} className="text-green-600" />
                            <span>{crop.climateRequirements}</span>
                          </div>
                          <div className="text-sm font-semibold text-orange-600">
                            {crop.profitMargin.netProfit}
                          </div>
                        </div>

                        {/* View Details Button */}
                        <Link
                          href={`/crops/${crop.id}`}
                          className="inline-flex items-center gap-2 w-full justify-center py-2 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                        >
                          View Details
                          <ChevronRight size={18} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl"
          >
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No crops found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Farming?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Use our AI-powered tools to get personalized crop recommendations, monitor your farm with IoT sensors, and maximize your yield and profit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              <Leaf size={20} />
              Farm Dashboard
            </Link>
            <Link
              href="/intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition border border-white"
            >
              <ChevronRight size={20} />
              Get Recommendations
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
