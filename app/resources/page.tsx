'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, CreditCard, TrendingUp, Video, Award, DollarSign, Users, Leaf } from 'lucide-react'

export default function ResourcesPage() {
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

  // Training & Knowledge Resources
  const trainingPrograms = [
    {
      title: 'Agricultural University Training',
      description: 'Free/subsidized courses from state agricultural universities on modern farming techniques',
      icon: Award,
      link: 'https://icar.org.in/en/node/3731',
      color: 'mint',
      tips: ['Check your state university website', 'Register for seasonal programs', 'Get certification after completion']
    },
    {
      title: 'Krishi Vigyan Kendra (KVK)',
      description: 'Village-level centers providing practical training in modern agricultural practices',
      icon: BookOpen,
      link: 'https://www.kvk.ernet.in/',
      color: 'peach',
      tips: ['Offers free hands-on training', 'Demo plots for new techniques', 'Seasonal workshops']
    },
    {
      title: 'Farming Videos & Webinars',
      description: 'Watch expert-led sessions on crop management, pest control, and soil health',
      icon: Video,
      link: 'https://www.youtube.com/user/ICAR/videos',
      color: 'lavender',
      tips: ['YouTube: ICAR India channel', 'Weekly webinars on new techniques', 'Available in regional languages']
    },
    {
      title: 'Mobile Apps for Farming Updates',
      description: 'Stay updated with weather, market prices, and agricultural advisories',
      icon: TrendingUp,
      link: 'https://play.google.com/store/apps/details?id=in.pusa.krishi',
      color: 'butter',
      tips: ['Pusa Krishi (ICAR official app)', 'Weather forecasts & advisories', 'Market price updates']
    },
  ]

  // Financial Aid & Debt Solutions
  const financialSolutions = [
    {
      title: 'Kisan Credit Card (KCC)',
      description: 'Low-interest agricultural credit for crop production and farm assets',
      icon: CreditCard,
      link: 'https://www.pmkisan.gov.in/PMKisanDetails.aspx',
      color: 'mint',
      benefits: [
        'Interest subsidy of 2% for on-time repayment',
        'Coverage up to 4 lakh per farmer',
        'Can be used for crop inputs & equipment'
      ],
      action: 'Apply at nearest bank'
    },
    {
      title: 'Crop Insurance Schemes',
      description: 'Protect against crop failure from natural calamities and yield loss',
      icon: DollarSign,
      link: 'https://pmfby.gov.in/',
      color: 'peach',
      benefits: [
        'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        'Premium subsidy: 75% for small/marginal farmers',
        'Claims within 72 hours of loss notification'
      ],
      action: 'Register during sowing season'
    },
    {
      title: 'Government Subsidies & Schemes',
      description: 'Various schemes for equipment, soil health, and organic farming',
      icon: Award,
      link: '/subsidies',
      isInternal: true,
      color: 'lavender',
      benefits: [
        'Equipment subsidy up to 50%',
        'Soil health card scheme',
        'Organic farming incentives'
      ],
      action: 'Check state agriculture ministry'
    },
    {
      title: 'Income Diversification',
      description: 'Reduce debt burden by earning from alternative agricultural activities',
      icon: Users,
      link: '/diversification',
      color: 'sky',
      isInternal: true,
      benefits: [
        'Dairy farming (₹8-12K/month extra)',
        'Poultry farming (low investment, quick returns)',
        'Fisheries/aquaculture in your region'
      ],
      action: 'Explore Programs'
    },
  ]

  const TrainingCard = ({ program }: any) => {
    const Icon = program.icon
    const colorClasses: any = {
      mint: 'card-bento-mint',
      peach: 'card-bento-peach',
      lavender: 'card-bento-lavender',
      butter: 'card-bento-butter',
      sky: 'card-bento-sky',
      rose: 'card-bento-rose'
    }

    return (
      <motion.div
        variants={itemVariants}
        className={`${colorClasses[program.color]} p-6 rounded-squircle cursor-pointer group`}
        whileHover={{ y: -4 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 12 }}
            className="p-3 rounded-lg bg-white/40"
          >
            <Icon size={28} className="text-nature-forest" />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{program.title}</h3>
            <p className="text-sm text-gray-700">{program.description}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {program.tips.map((tip: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-nature-forest mt-2 flex-shrink-0" />
              <p className="text-xs text-gray-700">{tip}</p>
            </div>
          ))}
        </div>

        <motion.a
          href={program.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-sm transition-all cursor-pointer hover:bg-green-700 hover:shadow-lg active:scale-95"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More →
        </motion.a>
      </motion.div>
    )
  }

  const FinanceCard = ({ solution }: any) => {
    const Icon = solution.icon
    const colorClasses: any = {
      mint: 'card-bento-mint',
      peach: 'card-bento-peach',
      lavender: 'card-bento-lavender',
      butter: 'card-bento-butter',
      sky: 'card-bento-sky',
      rose: 'card-bento-rose'
    }

    return (
      <motion.div
        variants={itemVariants}
        className={`${colorClasses[solution.color]} p-6 rounded-squircle`}
        whileHover={{ y: -4 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -12 }}
            className="p-3 rounded-lg bg-white/40"
          >
            <Icon size={28} className="text-nature-forest" />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{solution.title}</h3>
            <p className="text-sm text-gray-700">{solution.description}</p>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-3 mb-4 space-y-2">
          {solution.benefits.map((benefit: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-nature-forest font-bold text-sm">✓</span>
              <p className="text-sm text-gray-800">{benefit}</p>
            </div>
          ))}
        </div>

        {solution.isInternal ? (
          <Link
            href={solution.link}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-sm transition-all cursor-pointer hover:bg-green-700 hover:shadow-lg active:scale-95"
          >
            {solution.action} →
          </Link>
        ) : (
          <motion.a
            href={solution.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-sm transition-all cursor-pointer hover:bg-green-700 hover:shadow-lg active:scale-95"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {solution.action} →
          </motion.a>
        )}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-50 via-sky-50 to-solar-50 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-spring-400 to-electric-400 bg-clip-text text-transparent">
            🌾 Resources & Guidance
          </h1>
          <p className="text-gray-600 mt-2">Overcome agriculture challenges with expert guidance, financial aid, and training resources</p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-bento-sky p-8 rounded-squircle mb-12"
        >
          <h2 className="text-2xl font-bold text-nature-forest mb-4">🎯 We Know Your Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 text-nature-forest">Traditional Methods Won't Scale</h3>
              <p className="text-gray-700">Modern agriculture requires updated knowledge on crop management, soil health, pest control, and market trends. We help you access expert training.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-nature-forest">Financial Stress is Real</h3>
              <p className="text-gray-700">Loans, crop failures, and debt create mental stress. But there are solutions—affordable credit, insurance, and diversified income streams.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Training & Knowledge */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 rounded-lg bg-spring-400/20">
              <BookOpen size={32} className="text-spring-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-nature-forest">1. Master Modern Farming</h2>
              <p className="text-gray-600">Free training, expert recommendations & agricultural updates</p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {trainingPrograms.map((program, idx) => (
              <TrainingCard key={idx} program={program} />
            ))}
          </motion.div>

          {/* Action Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-spring-400/10 border-l-4 border-spring-400 p-6 rounded-lg mt-8"
          >
            <h3 className="font-bold text-lg text-nature-forest mb-3">💡 Quick Start Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Register with your nearest <strong>Krishi Vigyan Kendra (KVK)</strong> for hands-on training</li>
              <li>✓ Subscribe to <strong>Pusa Krishi app</strong> for daily farming advisories (in your language)</li>
              <li>✓ Join local <strong>Farmer Producer Groups (FPGs)</strong> to learn from peers</li>
              <li>✓ Follow <strong>ICAR YouTube channel</strong> for expert-led videos on pest management & soil health</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Section 2: Financial Aid & Debt Relief */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 rounded-lg bg-juicy-400/20">
              <CreditCard size={32} className="text-juicy-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-nature-forest">2. Manage Finances & Reduce Debt</h2>
              <p className="text-gray-600">Affordable credit, insurance, govt. schemes & income diversification</p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {financialSolutions.map((solution, idx) => (
              <FinanceCard key={idx} solution={solution} />
            ))}
          </motion.div>

          {/* Financial Roadmap */}
          <motion.div
            variants={itemVariants}
            className="bg-juicy-400/10 border-l-4 border-juicy-400 p-6 rounded-lg mt-8"
          >
            <h3 className="font-bold text-lg text-nature-forest mb-4">📊 Your Financial Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-nature-forest mb-2">Immediate Actions:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>☑ Apply for Kisan Credit Card (low interest, ₹4 lakh limit)</li>
                  <li>☑ Register for Crop Insurance before sowing season</li>
                  <li>☑ Check if you qualify for existing govt subsidies</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-nature-forest mb-2">Long-term Security:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>☑ Diversify with dairy (₹8-12K/month extra)</li>
                  <li>☑ Start poultry farming (low investment, quick returns)</li>
                  <li>☑ Explore fisheries/aquaculture in your region</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Success Stories Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 rounded-lg bg-berry-500/20">
              <Users size={32} className="text-berry-500" />
            </div>
            <h2 className="text-3xl font-bold text-nature-forest">Real Farmer Success Stories</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                name: 'Rajesh Kumar (Maharashtra)',
                story: 'Learned drip irrigation from KVK, increased yields by 40% and reduced water usage.',
                color: 'mint'
              },
              {
                name: 'Priya Singh (Punjab)',
                story: 'Took KCC loan for equipment. Combined with crop insurance, her income doubled in 2 years.',
                color: 'peach'
              },
              {
                name: 'Mohan Reddy (Telangana)',
                story: 'Started dairy farming alongside crops using govt subsidy. Now earns ₹15K monthly extra.',
                color: 'lavender'
              },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`card-bento-${story.color} p-6 rounded-squircle`}
              >
                <p className="font-bold text-nature-forest mb-2">{story.name}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{story.story}</p>
                <div className="mt-4 text-2xl">✨</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Seeds & Crops A-Z Guide */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 rounded-lg bg-electric-400/20">
              <Leaf size={32} className="text-electric-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-nature-forest">3. Crop & Plant Guide (A-Z)</h2>
              <p className="text-gray-600">Comprehensive information on growing, profitability, and benefits of crops</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-green-200"
          >
            <div className="flex items-start gap-4">
              <Leaf className="text-green-600 flex-shrink-0" size={28} />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-nature-forest mb-2">Access Detailed Crop Guides</h3>
                <p className="text-gray-700 mb-4">Explore comprehensive information on over 50 crops including growing profiles, market data, profitability analysis, and fertilizer recommendations.</p>
                <Link
                  href="/crops"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg transition-all font-semibold cursor-pointer"
                >
                  <Leaf size={20} />
                  Browse All Crops (A-Z)
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-spring-400 to-electric-400 rounded-squircle p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-lg mb-6 opacity-95">Start with one action today. Compare your crop yield, get personalized recommendations, and connect with expert training programs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/intelligence"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-gray-100 hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              View Crop Recommendations
            </motion.a>
            <motion.a
              href="/scan"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-gray-100 hover:shadow-lg transition-all cursor-pointer active:scale-95 border-2 border-white"
            >
              Scan Your Farm
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
