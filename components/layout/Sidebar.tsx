'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sprout, BarChart3, Leaf, Globe, RadioTower, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/scan', label: 'AI Scanner', icon: Leaf },
    { href: '/intelligence', label: 'Intelligence', icon: Globe },
    { href: '/telemetry', label: 'Telemetry', icon: RadioTower },
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 h-screen sticky top-0 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
          <Sprout className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-nature-forest">KRUSHI</h1>
          <p className="text-xs text-gray-500">Smart Farming</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-forest text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </motion.div>
        <div className="px-4 py-3 text-xs text-gray-500">
          <p>v1.0.0</p>
          <p>© 2024 Krushi Scan</p>
        </div>
      </div>
    </motion.aside>
  )
}
