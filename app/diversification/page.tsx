'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Milk, Bird, Fish, ArrowLeft, MapPin, Zap, DollarSign, TrendingUp,
  CheckCircle, ExternalLink, Users
} from 'lucide-react'

export default function DiversificationPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const programs = [
    {
      title: 'Dairy Farming',
      icon: Milk,
      color: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      earning: '₹8,000 - 12,000/month extra',
      description: 'Transform milk into income - start with 2-3 cows, expand gradually',
      benefits: [
        'Steady daily income from milk sales',
        'Government subsidy on cattle purchase',
        'Zero interest loans available',
        'Free veterinary care in many states',
        'Milk cooperatives for bulk selling'
      ],
      requirements: [
        'Land: 1.5-2 acres minimum',
        'Capital: ₹1.5-2 lakhs for 2-3 cows',
        'Time: 3-4 hours daily management',
        'Basic knowledge of cattle care'
      ],
      links: [
        { label: 'National Dairy Development Board', url: 'https://www.nddb.coop/' },
        { label: 'Find Dairy Schemes in Your State', url: 'https://agricoop.gov.in/' },
        { label: 'Dairy Farming Guide', url: 'https://www.icar.org.in/' }
      ]
    },
    {
      title: 'Poultry Farming',
      icon: Bird,
      color: 'from-yellow-50 to-orange-100',
      iconColor: 'text-orange-600',
      earning: '₹5,000 - 10,000/month extra',
      description: 'Low investment, quick returns - start with 50-100 birds',
      benefits: [
        'Quick market demand for eggs & meat',
        'Low startup cost (₹50K-1L)',
        'Fast returns (70-90 days cycle)',
        'Government training programs available',
        'Export potential for premium eggs'
      ],
      requirements: [
        'Land/Shed: 400-500 sq ft',
        'Capital: ₹50,000 - 1,00,000',
        'Time: 2-3 hours daily',
        'Basic biosecurity knowledge'
      ],
      links: [
        { label: 'Ministry of Animal Husbandry', url: 'https://dahd.gov.in/' },
        { label: 'Poultry Farming Portal', url: 'https://dbt.mpdah.gov.in/' },
        { label: 'Poultry Training Centers', url: 'https://dahd.gov.in/schemes' }
      ]
    },
    {
      title: 'Fisheries & Aquaculture',
      icon: Fish,
      color: 'from-green-50 to-teal-100',
      iconColor: 'text-green-600',
      earning: '₹6,000 - 15,000/month extra',
      description: 'High profit potential - pond fish farming or cage culture',
      benefits: [
        'High protein food production',
        'Water bodies as asset',
        'Premium prices in markets',
        'Government subsidy up to 50%',
        'Export demand growing rapidly'
      ],
      requirements: [
        'Water source: Pond/tank with water',
        'Land: 0.5-1 acre pond suitable',
        'Capital: ₹3-5 lakhs for 1 acre pond',
        'Training: Basic fish farming knowledge'
      ],
      links: [
        { label: 'Ministry of Fisheries', url: 'https://dof.gov.in/' },
        { label: 'Blue Revolution Scheme', url: 'https://pib.gov.in/' },
        { label: 'Aquaculture Development', url: 'https://dof.gov.in/schemes' }
      ]
    }
  ]

  const StepByStep = ({ program }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${program.color} rounded-2xl p-8 border border-gray-200`}
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 12 }}
          className="p-4 bg-white rounded-lg"
        >
          <program.icon size={32} className={program.iconColor} />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{program.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{program.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Benefits */}
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle size={20} className={program.iconColor} />
            Key Benefits
          </h4>
          <ul className="space-y-2">
            {program.benefits.map((benefit: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-gray-700">
                <span className={program.iconColor}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <Zap size={20} className={program.iconColor} />
            Requirements
          </h4>
          <ul className="space-y-2">
            {program.requirements.map((req: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-gray-700">
                <span className={program.iconColor}>○</span>
                <span className="text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Earning Highlight */}
      <div className="bg-white rounded-lg p-4 mb-6 border-2 border-gray-300">
        <p className="text-sm text-gray-600">Estimated Monthly Extra Income</p>
        <p className="text-2xl font-bold text-green-600">{program.earning}</p>
      </div>

      {/* Links */}
      <div className="bg-white/50 rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <ExternalLink size={18} />
          Useful Resources
        </h4>
        <div className="space-y-2">
          {program.links.map((link: any, idx: number) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              <span>→ {link.label}</span>
              <ExternalLink size={14} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/resources" className="flex items-center gap-2 text-green-600 font-semibold mb-4 hover:text-green-700">
            <ArrowLeft size={20} />
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Income Diversification Programs
          </h1>
          <p className="text-gray-600 mt-2">Reduce debt burden with sustainable income sources - dairy, poultry, and fisheries</p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 mb-12 shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Diversify Your Income?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-red-600 mb-3">❌ The Problem</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Single crop dependency = financial vulnerability</li>
                <li>• One bad harvest = entire year's loss</li>
                <li>• Government subsidy not enough to cover expenses</li>
                <li>• Debt keeps increasing despite hard work</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-600 mb-3">✅ The Solution</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Multiple income streams = financial stability</li>
                <li>• Dairy/Poultry = steady monthly earnings</li>
                <li>• Diversification = risk distribution</li>
                <li>• Government subsidies available for all activities</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main Programs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-16"
        >
          {programs.map((program, idx) => (
            <StepByStep key={idx} program={program} />
          ))}
        </motion.div>

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 mb-12 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">How to Get Started?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-3">1️⃣</div>
              <h3 className="font-bold text-lg mb-2">Assess Your Resources</h3>
              <p className="text-sm text-white/90">Check available land, water, capital, and time commitment for each option</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-3">2️⃣</div>
              <h3 className="font-bold text-lg mb-2">Get Training</h3>
              <p className="text-sm text-white/90">Register at agricultural university or KVK for free training programs in your region</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold mb-3">3️⃣</div>
              <h3 className="font-bold text-lg mb-2">Access Finance</h3>
              <p className="text-sm text-white/90">Apply for Kisan Credit Card or subsidy schemes before starting</p>
            </div>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Income Growth Timeline</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">Month 0-1</p>
              <p className="font-bold text-lg text-blue-600">Setup</p>
              <p className="text-xs text-gray-700 mt-1">Purchase livestock/equipment</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <p className="text-sm text-gray-600">Month 2-3</p>
              <p className="font-bold text-lg text-teal-600">Early Returns</p>
              <p className="text-xs text-gray-700 mt-1">First income starts</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600">Month 6-12</p>
              <p className="font-bold text-lg text-green-600">Stable Income</p>
              <p className="text-xs text-gray-700 mt-1">+₹5K-10K/month</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
              <p className="text-sm text-gray-600">Year 2+</p>
              <p className="font-bold text-lg text-emerald-600">Scale Up</p>
              <p className="text-xs text-gray-700 mt-1">Expand or diversify more</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Second Income Stream?</h2>
          <p className="text-lg mb-6 opacity-95">Choose the program that fits your resources and apply for government support today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://agricoop.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-gray-100 hover:shadow-lg transition-all cursor-pointer inline-block"
              >
                Explore Government Schemes
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/resources"
                className="px-8 py-3 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-all cursor-pointer border border-white inline-block"
              >
                Back to Resources
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
