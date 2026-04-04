'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Wrench, Leaf, Sprout, ArrowLeft, CheckCircle, DollarSign, TrendingUp,
  MapPin, FileText, ExternalLink, AlertCircle, Phone
} from 'lucide-react'

export default function SubsidiesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const schemes = [
    {
      title: 'Equipment Subsidy Scheme',
      icon: Wrench,
      color: 'from-orange-50 to-red-100',
      iconColor: 'text-orange-600',
      subsidy: 'Up to 50% equipment cost',
      description: 'Government funds for tractors, harvesters, drip irrigation, and modern farm equipment',
      areas: [
        'Tractors & power tillers',
        'Harvesters & threshers',
        'Drip/sprinkler irrigation systems',
        'Soil testing equipment',
        'Solar panels for farm operations'
      ],
      howToApply: [
        'Register on your state agriculture ministry portal',
        'Provide bank details & land documents',
        'Get equipment quote from authorized dealers',
        'Submit subsidy application with documents',
        'Department approves & transfers subsidy directly to bank',
        'Purchase equipment & claim remaining amount'
      ],
      benefits: [
        'Direct bank transfer of subsidy amount',
        'Reduces equipment cost significantly',
        'Available across all states',
        'No hidden charges or commissions'
      ],
      links: [
        { label: 'Central Sector Scheme Portal', url: 'https://agritech.tnau.ac.in/' },
        { label: 'PMKSY Irrigation Subsidy', url: 'https://pmksy.gov.in/' },
        { label: 'State Agriculture Ministry Portal', url: 'https://agricoop.gov.in/' }
      ]
    },
    {
      title: 'Soil Health Card Scheme',
      icon: Leaf,
      color: 'from-green-50 to-emerald-100',
      iconColor: 'text-green-600',
      subsidy: '100% FREE soil testing',
      description: 'Complete soil analysis to optimize fertilizer use and improve crop productivity',
      areas: [
        'Macronutrients (Nitrogen, Phosphorus, Potassium)',
        'Micronutrients (Iron, Zinc, Boron, etc.)',
        'Organic matter content',
        'Soil pH level',
        'Electrical conductivity'
      ],
      howToApply: [
        'Visit nearest block agriculture office',
        'Register for soil testing (completely FREE)',
        'Provide soil samples from your field',
        'Lab analyzes your soil within 10-15 days',
        'Receive personalized fertilizer recommendation card',
        'Use recommendations to reduce fertilizer costs by 20-30%'
      ],
      benefits: [
        'FREE soil testing & card',
        'Customized fertilizer recommendations',
        'Reduces fertilizer waste & cost',
        'Improves crop yield by 10-20%',
        'Environmentally sustainable',
        'Better soil health long-term'
      ],
      links: [
        { label: 'Soil Health Card Portal', url: 'https://soilhealth.dac.gov.in/' },
        { label: 'Find Your Block Office', url: 'https://agricoop.gov.in/' },
        { label: 'How to Use Soil Card', url: 'https://soilhealth.dac.gov.in/index.php/how-to' }
      ]
    },
    {
      title: 'Organic Farming Incentives',
      icon: Sprout,
      color: 'from-teal-50 to-green-100',
      iconColor: 'text-teal-600',
      subsidy: '₹20,000-50,000 per acre',
      description: 'Government support for transitioning to organic farming with premium market prices',
      areas: [
        'Direct income support (₹20,000-50,000/acre)',
        'Organic certification subsidy',
        'Compost/vermicompost setup',
        'Organic input vouchers',
        'Training programs (FREE)'
      ],
      howToApply: [
        'Visit agriculture department in your district',
        'Provide land documents & proof of organic practice',
        'Sign commitment for 3-year organic conversion',
        'Get enrolled in PMKK/ONDC organic scheme',
        'Receive annual subsidy in installments',
        'Get organic certification after 2-3 years',
        'Access premium organic markets & higher prices'
      ],
      benefits: [
        'Direct subsidy to farmer bank account',
        '20-30% premium for organic produce',
        'Access to organic export markets',
        'Zero chemical cost after transition',
        'Better soil health & water retention',
        'Multiple crops eligible (vegetables, cereals, spices)',
        'FREE training & certification support'
      ],
      links: [
        { label: 'PMKKY Organic Scheme', url: 'https://pmksy.gov.in/' },
        { label: 'Organic Farming Guidelines', url: 'https://agricoop.gov.in/' },
        { label: 'Organic Certification Bodies', url: 'https://agricert.org.in/' }
      ]
    }
  ]

  const states = [
    { name: 'Andhra Pradesh', link: 'https://agriculture.ap.gov.in/' },
    { name: 'Bihar', link: 'https://agriculture.bihar.gov.in/' },
    { name: 'Chhattisgarh', link: 'https://agriculture.cg.gov.in/' },
    { name: 'Gujarat', link: 'https://agriculture.gujarat.gov.in/' },
    { name: 'Haryana', link: 'https://agriculture.haryana.gov.in/' },
    { name: 'Himachal Pradesh', link: 'https://himachal.nic.in/en-IN/Department.jsp?deplevel=2&id=67' },
    { name: 'Jharkhand', link: 'https://agriculture.jharkhand.gov.in/' },
    { name: 'Karnataka', link: 'https://agriculture.karnataka.gov.in/' },
    { name: 'Kerala', link: 'https://agriculture.kerala.gov.in/' },
    { name: 'Madhya Pradesh', link: 'https://agriculture.mp.gov.in/' },
    { name: 'Maharashtra', link: 'https://agriculture.maharashtra.gov.in/' },
    { name: 'Odisha', link: 'https://agriculture.odisha.gov.in/' },
    { name: 'Punjab', link: 'https://agriculture.punjab.gov.in/' },
    { name: 'Rajasthan', link: 'https://agriculture.rajasthan.gov.in/' },
    { name: 'Tamil Nadu', link: 'https://agriculture.tn.gov.in/' },
    { name: 'Telangana', link: 'https://agriculture.telangana.gov.in/' },
    { name: 'Uttar Pradesh', link: 'https://agriculture.up.gov.in/' },
    { name: 'Uttarakhand', link: 'https://agriculture.uttarakhand.gov.in/' },
    { name: 'West Bengal', link: 'https://agriculture.wb.gov.in/' }
  ]

  const SchemeCard = ({ scheme }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${scheme.color} rounded-2xl p-8 border border-gray-200`}
    >
      <div className="flex items-start gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 12 }}
          className="p-4 bg-white rounded-lg"
        >
          <scheme.icon size={32} className={scheme.iconColor} />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{scheme.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
        </div>
      </div>

      {/* Subsidy Highlight */}
      <div className="bg-white rounded-lg p-4 mb-6 border-2 border-gray-300">
        <p className="text-sm text-gray-600">Government Benefit</p>
        <p className="text-2xl font-bold text-green-600">{scheme.subsidy}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Coverage Areas */}
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle size={20} className={scheme.iconColor} />
            Coverage
          </h4>
          <ul className="space-y-2">
            {scheme.areas.map((area: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-gray-700">
                <span className={scheme.iconColor}>✓</span>
                <span className="text-sm">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp size={20} className={scheme.iconColor} />
            Benefits
          </h4>
          <ul className="space-y-2">
            {scheme.benefits.map((benefit: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-gray-700">
                <span className={scheme.iconColor}>→</span>
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How to Apply */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
        <h4 className="font-bold text-lg text-blue-900 mb-4">📋 How to Apply</h4>
        <ol className="space-y-2">
          {scheme.howToApply.map((step: string, idx: number) => (
            <li key={idx} className="flex gap-3 text-blue-900">
              <span className="font-bold text-blue-600 flex-shrink-0">{idx + 1}.</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Links */}
      <div className="bg-white/50 rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <ExternalLink size={18} />
          Government Resources
        </h4>
        <div className="space-y-2">
          {scheme.links.map((link: any, idx: number) => (
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
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
            Government Subsidies & Schemes
          </h1>
          <p className="text-gray-600 mt-2">Access FREE government support - subsidies, soil testing, and organic incentives</p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 mb-12 shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Use Government Schemes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg text-green-700 mb-3">💰 Cost Reduction</h3>
              <p className="text-gray-700">Save 30-50% on equipment costs, get FREE soil testing, and earn 20-30% premium for organic produce</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg text-blue-700 mb-3">📈 Increased Income</h3>
              <p className="text-gray-700">Government subsidies + premium organic markets + reduced input costs = 2-3x better profitability</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg text-purple-700 mb-3">♻️ Sustainability</h3>
              <p className="text-gray-700">Better soil health, lower chemical use, environmental protection, and long-term farm productivity</p>
            </div>
          </div>
        </motion.div>

        {/* Main Schemes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-16"
        >
          {schemes.map((scheme, idx) => (
            <SchemeCard key={idx} scheme={scheme} />
          ))}
        </motion.div>

        {/* State-wise Agriculture Ministry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin size={28} />
            State Agriculture Ministry Links
          </h2>
          <p className="text-gray-700 mb-6">Find the agriculture ministry in your state to apply for schemes and get personalized support</p>
          <div className="grid md:grid-cols-3 gap-4">
            {states.map((state, idx) => (
              <motion.a
                key={idx}
                href={state.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-gray-300 hover:border-green-500 hover:shadow-md transition-all"
              >
                <p className="font-semibold text-green-700 flex items-center gap-2">
                  {state.name}
                  <ExternalLink size={14} />
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Step by Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">General Steps to Claim Any Subsidy</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-3">1️⃣</div>
              <h3 className="font-bold text-lg mb-2">Prepare Documents</h3>
              <p className="text-sm text-white/90">Land ownership proof, Aadhar, bank passbook, land survey number</p>
            </div>
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-3">2️⃣</div>
              <h3 className="font-bold text-lg mb-2">Visit Block Office</h3>
              <p className="text-sm text-white/90">Contact your block agriculture officer or online portal registration</p>
            </div>
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-3">3️⃣</div>
              <h3 className="font-bold text-lg mb-2">Submit Application</h3>
              <p className="text-sm text-white/90">Online application or paper form with required documents</p>
            </div>
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-3">4️⃣</div>
              <h3 className="font-bold text-lg mb-2">Get Approval</h3>
              <p className="text-sm text-white/90">Department verifies and transfers subsidy to your bank account</p>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-12"
        >
          <h3 className="font-bold text-lg text-yellow-900 mb-4 flex items-center gap-2">
            <AlertCircle size={24} />
            Important Information
          </h3>
          <ul className="space-y-2 text-yellow-900 text-sm">
            <li>✓ All schemes are <strong>completely FREE</strong> - no charges for application</li>
            <li>✓ <strong>No middlemen</strong> - apply directly to government or authorized portals</li>
            <li>✓ Subsidy is transferred <strong>directly to your bank account</strong></li>
            <li>✓ Deadlines vary by scheme - <strong>apply early</strong> to avoid missing windows</li>
            <li>✓ Some schemes have <strong>maximum land size limits</strong> - check eligibility</li>
            <li>✓ Keep all documents and receipts for claim processing</li>
          </ul>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Phone size={28} />
            Need Help? Contact Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">National Level</h3>
              <ul className="space-y-2 text-gray-700">
                <li>📞 <strong>ICAR Helpline:</strong> 1800-80-50-50 (Toll Free)</li>
                <li>📧 <strong>Agricultural Scheme Support:</strong> agricoop.gov.in</li>
                <li>🌐 <strong>Farmer Portal:</strong> www.farmersportal.gov.in</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">Local Support</h3>
              <ul className="space-y-2 text-gray-700">
                <li>📍 Visit your <strong>Block Agriculture Office</strong></li>
                <li>📞 Contact <strong>Krishi Vigyan Kendra (KVK)</strong> in your district</li>
                <li>🤝 Connect with <strong>Farmer Producer Groups (FPGs)</strong> near you</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Start Claiming Your Benefits Today!</h2>
          <p className="text-lg mb-6 opacity-95">Don't leave free money on the table. Apply for government subsidies and transform your farm's profitability</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://pmfby.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-gray-100 hover:shadow-lg transition-all cursor-pointer inline-block"
              >
                Apply for Scheme →
              </a>
            </motion.div>
            <Link
              href="/resources"
              className="px-8 py-3 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 transition-all cursor-pointer border border-white inline-block"
            >
              Back to Resources
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
