'use client'

import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { motion } from 'framer-motion'

export function MobileNav() {
  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-forest rounded-lg flex items-center justify-center">
            <Sprout className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-bold text-nature-forest">KRUSHI SCAN</h1>
        </Link>
      </div>
    </motion.header>
  )
}
