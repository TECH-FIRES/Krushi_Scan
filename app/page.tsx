'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sprout, Droplets, Leaf, BarChart3, Zap, ArrowRight, Smartphone, Cloud, Satellite, Radio } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-nature-sage">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-nature-leaf/20 text-nature-forest font-semibold text-sm">
                🌱 Smart Farming Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-nature-forest mb-6 leading-tight"
            >
              KRUSHI SCAN
              <br />
              <span className="text-nature-leaf">Smart Farming</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 mb-8 leading-relaxed"
            >
              Harness the power of AI and IoT sensors to revolutionize your farming. Real-time monitoring, disease detection, and personalized crop recommendations to maximize yield and sustainability.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              {[
                { icon: BarChart3, text: 'Real-time Sensor Monitoring' },
                { icon: Leaf, text: 'AI-Powered Disease Detection' },
                { icon: Droplets, text: 'Smart Irrigation Management' },
                { icon: Zap, text: 'Crop Optimization Recommendations' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="text-nature-forest flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(45, 90, 39, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-forest text-white font-bold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all"
                >
                  Launch Dashboard
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-96 h-96"
            >
              {/* Background Circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-nature-forest/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border-2 border-nature-leaf/20"
              />

              {/* Center Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-[6px] border-white/80 backdrop-blur-sm z-10">
                    {/* Using a reliable Pexels image of a farmer with technology */}
                    <img 
                      src="https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Smart Farming Technology"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nature-forest/50 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Floating Badge (Now outside the overflow so it isn't cut off by the circle) */}
                  <div className="absolute -bottom-2 -right-4 flex items-center gap-3 glass-card !p-3 !border-white/50 backdrop-blur-md rounded-2xl shadow-xl z-20">
                    <div className="bg-gradient-leaf p-2 rounded-xl shadow-inner">
                      <Sprout className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-nature-forest text-sm font-bold">Smart Farming</p>
                      <p className="text-gray-600 text-[11px] font-medium">AI-Powered Precision</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.cos((i * Math.PI) / 2) * 160, 0],
                    y: [0, Math.sin((i * Math.PI) / 2) * 160, 0],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    i === 1 ? 'text-xl' : i === 2 ? 'text-2xl' : i === 3 ? 'text-3xl' : 'text-2xl'
                  }`}
                >
                  {i === 1 ? '💧' : i === 2 ? '🌾' : i === 3 ? '🌿' : '📊'}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">Everything you need to optimize your farming</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Dashboard', desc: 'Real-time sensor data visualization' },
              { icon: Leaf, title: 'AI Scanner', desc: 'Disease detection with confidence scores' },
              { icon: Droplets, title: 'Intelligence', desc: 'Region-based crop recommendations' },
              { icon: Zap, title: 'Telemetry', desc: 'Raw IoT sensor data monitoring' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-card-hover p-6 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block mb-4"
                >
                  <feature.icon className="w-12 h-12 text-nature-forest" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-spring-50/40 via-electric-50/20 to-spring-50/40 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-spring-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-spring-400/20 to-electric-400/20 border border-spring-300/40 text-spring-600 font-semibold text-sm mb-4 backdrop-blur-sm"
            >
              ⚙️ Working Model Depiction
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold text-nature-forest mb-4 leading-tight">
              How Krushi Scan Works
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Our integrated approach combines cutting-edge technology with agricultural expertise
            </p>
          </motion.div>

          {/* Main Workflow Visualization */}
          <div className="relative py-8 md:py-16">
            {/* Desktop SVG Connector Path */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 8px 12px rgba(87, 204, 153, 0.15))' }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#57CC99" />
                  <stop offset="100%" stopColor="#80ED99" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 5% 55% Q 25% 35% 45% 50% T 85% 55%"
                stroke="url(#pathGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              {/* Animated dots along path */}
              <motion.circle
                r="6"
                fill="#57CC99"
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M 5% 55% Q 25% 35% 45% 50% T 85% 55%')",
                  offsetDistance: "0%"
                }}
                animate={{
                  offsetDistance: "100%"
                }}
              />
            </svg>

            {/* Workflow Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-20">
              {/* Step 1: IoT Sensors */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {/* Double ring effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-spring-300/30 to-electric-300/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-spring-400 to-electric-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl cursor-pointer transition-shadow border-4 border-white relative z-10">
                    <Radio className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl text-nature-forest text-center mt-6 mb-2">IoT Sensors</h3>
                <p className="text-sm md:text-base text-gray-600 text-center px-2 leading-relaxed">Real-time field data collection from sensors</p>
              </motion.div>

              {/* Mobile Connector */}
              <div className="md:hidden flex justify-center py-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-spring-400 text-3xl font-bold"
                >
                  ↓
                </motion.div>
              </div>

              {/* Step 2: AI Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-berry-300/30 to-juicy-300/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-berry-500 to-juicy-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl cursor-pointer transition-shadow border-4 border-white relative z-10">
                    <Zap className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl text-nature-forest text-center mt-6 mb-2">AI Analysis</h3>
                <p className="text-sm md:text-base text-gray-600 text-center px-2 leading-relaxed">Disease detection & health scoring</p>
              </motion.div>

              {/* Mobile Connector */}
              <div className="md:hidden flex justify-center py-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-spring-400 text-3xl font-bold"
                >
                  ↓
                </motion.div>
              </div>

              {/* Step 3: Satellite Data */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300/30 to-electric-300/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-sky-400 to-electric-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl cursor-pointer transition-shadow border-4 border-white relative z-10">
                    <Satellite className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl text-nature-forest text-center mt-6 mb-2">Satellite Data</h3>
                <p className="text-sm md:text-base text-gray-600 text-center px-2 leading-relaxed">Crop health monitoring & mapping</p>
              </motion.div>

              {/* Mobile Connector */}
              <div className="md:hidden flex justify-center py-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-spring-400 text-3xl font-bold"
                >
                  ↓
                </motion.div>
              </div>

              {/* Step 4: Data Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-solar-300/30 to-juicy-300/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-solar-400 to-juicy-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl cursor-pointer transition-shadow border-4 border-white relative z-10">
                    <Cloud className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl text-nature-forest text-center mt-6 mb-2">Data Intelligence</h3>
                <p className="text-sm md:text-base text-gray-600 text-center px-2 leading-relaxed">Weather, market, & recommendations</p>
              </motion.div>

              {/* Mobile Connector */}
              <div className="md:hidden flex justify-center py-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-spring-400 text-3xl font-bold"
                >
                  ↓
                </motion.div>
              </div>

              {/* Step 5: Smart Actions */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-300/30 to-spring-300/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-electric-400 to-spring-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl cursor-pointer transition-shadow border-4 border-white relative z-10">
                    <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl text-nature-forest text-center mt-6 mb-2">Smart Actions</h3>
                <p className="text-sm md:text-base text-gray-600 text-center px-2 leading-relaxed">Personalized farmer recommendations</p>
              </motion.div>
            </div>
          </div>

          {/* Benefits Grid Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-16 md:mt-20"
          >
            {[
              {
                icon: Radio,
                title: 'Real-time Monitoring',
                desc: 'IoT sensors continuously monitor soil moisture, temperature, humidity, and provide instant field insights',
                color: 'from-spring-400 to-electric-400'
              },
              {
                icon: Zap,
                title: 'AI-Powered Insights',
                desc: 'Machine learning algorithms analyze vast datasets to detect diseases early and predict optimal crop management',
                color: 'from-berry-500 to-juicy-400'
              },
              {
                icon: BarChart3,
                title: 'Actionable Intelligence',
                desc: 'Deliver precise, location-specific recommendations for irrigation, fertilization, and pest management',
                color: 'from-solar-400 to-juicy-400'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-3xl backdrop-blur-xl border border-white/50 hover:border-white/80 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-nature-forest mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of farmers using KRUSHI SCAN to increase yields and reduce costs.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-xl bg-gradient-forest text-white font-bold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all"
              >
                Start Dashboard Now
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-gray-600">
          <p>© 2024 KRUSHI SCAN. Smart Agriculture for a Sustainable Future.</p>
        </div>
      </footer>
    </div>
  )
}
