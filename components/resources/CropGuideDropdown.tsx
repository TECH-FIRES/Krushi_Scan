'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Leaf, Search } from 'lucide-react'
import { cropsDatabase } from '@/lib/cropsDatabase'

export function CropGuideDropdown() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['A'])
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique categories sorted
  const categories = Array.from(new Set(cropsDatabase.map(crop => crop.category))).sort()

  // Filter crops based on search
  const getFilteredCrops = (category: string) => {
    return cropsDatabase.filter(
      crop => crop.category === category &&
      (searchTerm === '' || crop.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleAllCategories = () => {
    if (expandedCategories.length === categories.length) {
      setExpandedCategories([])
    } else {
      setExpandedCategories([...categories])
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search crops by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-electric-400/30 focus:border-electric-400 focus:outline-none transition bg-white/50"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAllCategories}
            className="px-4 py-3 bg-electric-400/20 hover:bg-electric-400/30 text-electric-400 font-semibold rounded-lg transition whitespace-nowrap"
          >
            {expandedCategories.length === categories.length ? 'Collapse All' : 'Expand All'}
          </motion.button>
        </div>
      </motion.div>

      {/* Crop Categories with Dropdowns */}
      <div className="space-y-4">
        {categories.map((category) => {
          const cropsInCategory = getFilteredCrops(category)
          const isExpanded = expandedCategories.includes(category)

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-electric-400/20 rounded-xl overflow-hidden hover:border-electric-400/40 transition"
            >
              {/* Category Header - Dropdown Trigger */}
              <motion.button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-electric-400/5 to-electric-400/0 hover:from-electric-400/10 hover:to-electric-400/5 transition"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="p-2 rounded-lg bg-electric-400/20">
                    <Leaf size={24} className="text-electric-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-nature-forest">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cropsInCategory.length} crop{cropsInCategory.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    size={28}
                    className="text-electric-400"
                  />
                </motion.div>
              </motion.button>

              {/* Crops Grid - Animated Dropdown */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-electric-400/20"
                  >
                    {cropsInCategory.length > 0 ? (
                      <div className="p-4 md:p-6 bg-white/50">
                        <motion.div
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {cropsInCategory.map((crop, idx) => (
                            <motion.div
                              key={crop.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="group"
                            >
                              <Link href={`/resources/crops/${crop.id}`}>
                                <div className="flex flex-col items-center cursor-pointer h-full">
                                  {/* Crop Image */}
                                  <div className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                                    <img
                                      src={crop.image}
                                      alt={crop.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <div className="bg-electric-400 text-white rounded-full p-2.5">
                                          <Leaf size={20} />
                                        </div>
                                      </motion.div>
                                    </div>
                                  </div>

                                  {/* Crop Name */}
                                  <h4 className="font-bold text-sm md:text-base text-center text-nature-forest group-hover:text-electric-400 transition-colors leading-snug lines-clamp-2">
                                    {crop.name}
                                  </h4>

                                  {/* Crop Type */}
                                  <p className="text-xs text-gray-500 text-center mt-1">
                                    {crop.cropType.split(' - ')[0]}
                                  </p>

                                  {/* Hover Details */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nature-forest to-nature-forest/60 text-white p-3 rounded-b-xl text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <p className="font-semibold">Click for details</p>
                                    <p className="text-white/80 mt-1">
                                      ₹{crop.profitMargin.marketPrice}
                                    </p>
                                  </motion.div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <p className="text-sm">No crops found matching "{searchTerm}"</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-electric-400/10 border-l-4 border-electric-400 p-6 rounded-lg"
      >
        <h3 className="font-bold text-lg text-nature-forest mb-3">🌱 What You'll Learn About Each Crop</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><strong>✓ Crop Type & Classification</strong> - Understand what category it belongs to</p>
            <p className="text-sm text-gray-700"><strong>✓ Climate & Weather</strong> - Optimal temperature, rainfall requirements</p>
            <p className="text-sm text-gray-700"><strong>✓ Soil Requirements</strong> - Soil type, pH, preparation guidelines</p>
            <p className="text-sm text-gray-700"><strong>✓ Benefits & Nutrition</strong> - Health benefits and uses</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><strong>✓ Growing Profile</strong> - Season, duration, spacing, irrigation, harvesting details</p>
            <p className="text-sm text-gray-700"><strong>✓ Profitability Analysis</strong> - Cost, yield, market price, net profit per acre</p>
            <p className="text-sm text-gray-700"><strong>✓ Market Demand</strong> - Export potential, price trends, demand outlook</p>
            <p className="text-sm text-gray-700"><strong>✓ Fertilizer & Pest Management</strong> - Nutrient requirements, disease control</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
