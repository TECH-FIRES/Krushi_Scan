'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Sprout, BarChart3, Leaf, Globe, RadioTower, TrendingUp, Languages, ChevronDown, LogOut, UserCircle2, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [selectedLang, setSelectedLang] = useState('English')
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const indianLanguages = [
    'English', 'हिन्दी (Hindi)', 'বাংলা (Bengali)', 'తెలుగు (Telugu)', 
    'मराठी (Marathi)', 'தமிழ் (Tamil)', 'اردو (Urdu)', 'ગુજરાતી (Gujarati)', 
    'ಕನ್ನಡ (Kannada)', 'ଓଡ଼ିଆ (Odia)', 'മലയാളം (Malayalam)', 'ਪੰਜਾਬੀ (Punjabi)', 
    'অসমীয়া (Assamese)', 'मैथिली (Maithili)', 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', 'कॉशुर (Kashmiri)', 
    'नेपाली (Nepali)', 'سنڌي (Sindhi)', 'डोगरी (Dogri)', 'कोंकणी (Konkani)', 
    'बड़ो (Bodo)', 'মৈতৈলোন্ (Manipuri)', 'संस्कृतम् (Sanskrit)'
  ]

  const languageMap: Record<string, string> = {
    'English': 'en', 'हिन्दी (Hindi)': 'hi', 'বাংলা (Bengali)': 'bn', 'తెలుగు (Telugu)': 'te',
    'मराठी (Marathi)': 'mr', 'தமிழ் (Tamil)': 'ta', 'اردو (Urdu)': 'ur', 'ગુજરાતી (Gujarati)': 'gu',
    'ಕನ್ನಡ (Kannada)': 'kn', 'ଓଡ଼ିଆ (Odia)': 'or', 'മലയാളം (Malayalam)': 'ml', 'ਪੰਜਾਬੀ (Punjabi)': 'pa',
    'অসমীয়া (Assamese)': 'as', 'मैथिली (Maithili)': 'mai', 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)': 'sat', 'कॉशुर (Kashmiri)': 'ks',
    'नेपाली (Nepali)': 'ne', 'سنڌي (Sindhi)': 'sd', 'डोगरी (Dogri)': 'doi', 'कोंकणी (Konkani)': 'gom',
    'बड़ो (Bodo)': 'brx', 'মৈতৈলোন্ (Manipuri)': 'mni-Mtei', 'संस्कृतम् (Sanskrit)': 'sa'
  }

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang)
    setShowLangMenu(false)

    const langCode = languageMap[lang] || 'en'
    const applyFn = (window as any).applyGoogleTranslateLanguage
    if (typeof applyFn === 'function') {
      applyFn(langCode)
      return
    }

    // Fallback if layout helper is not available yet.
    document.cookie = 'googtrans=/en/' + langCode + ';path=/'
    window.location.reload()
  }

  useEffect(() => {
    const codeToLang: Record<string, string> = Object.entries(languageMap).reduce((acc, [label, code]) => {
      acc[code] = label
      return acc
    }, {} as Record<string, string>)

    try {
      const saved = localStorage.getItem('krushi_selected_lang') || 'en'
      setSelectedLang(codeToLang[saved] || 'English')
    } catch {
      setSelectedLang('English')
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me', {
          cache: 'no-store',
          credentials: 'include',
        })
        const data = await res.json()
        if (!active) return
        setUser(data?.user ?? null)
      } catch {
        if (!active) return
        setUser(null)
      } finally {
        if (active) setLoadingUser(false)
      }
    }

    loadUser()
    return () => {
      active = false
    }
  }, [pathname])

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setUser(null)
      setMenuOpen(false)
      router.push('/login')
    }
  }

  const profileName = user?.name || user?.email?.split('@')[0] || 'Farmer'
  const initials = profileName.slice(0, 1).toUpperCase()

  const navItems = [
    { href: '/', label: 'Home', icon: Sprout },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/scan', label: 'AI Scanner', icon: Leaf },
    { href: '/market', label: 'Market', icon: TrendingUp },
    { href: '/intelligence', label: 'Intelligence', icon: Globe },
    { href: '/telemetry', label: 'Field Sensors', icon: RadioTower },
    { href: '/resources', label: 'Resources', icon: BookOpen },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-forest rounded-lg flex items-center justify-center">
          <Sprout className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-nature-forest leading-none">KRUSHI SCAN</h1>
          <p className="hidden md:block text-[10px] text-gray-500 font-medium mt-1">Smart Farming</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          if (item.href === '/' && pathname !== '/') return null; // Hide home link if not on home? Actually, let's keep it clean: no home in the middle if it takes space. Let's just map all items except home, because clicking the logo acts as home.
          if (item.href === '/') return null;

          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-forest text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-nature-forest'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Right side actions / Settings */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Language Selector */}
        <div className="relative" ref={menuRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2 md:px-3 py-2 text-sm font-medium text-gray-600 hover:text-nature-forest hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Globe size={18} />
            <span className="hidden md:inline">{selectedLang.split(' ')[0]}</span>
          </motion.button>

          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-glass border border-gray-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
              >
                <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center justify-center gap-2">
                  <Languages size={16} className="text-gray-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Language</span>
                </div>
                {indianLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedLang === lang
                        ? 'bg-nature-forest/10 text-nature-forest font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-nature-forest'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!loadingUser && !user && (
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 text-sm font-medium text-nature-forest border-2 border-nature-forest rounded-xl hover:bg-nature-forest hover:text-white transition-colors"
            >
              Sign In
            </motion.button>
          </Link>
        )}

        {!loadingUser && user && (
          <div className="relative hidden md:block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-forest text-white flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{profileName}</p>
                <p className="text-xs text-gray-500 leading-tight">Profile</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </motion.button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{profileName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link href="/profile">
                  <button
                    className="w-full px-4 py-3 text-left text-sm text-nature-forest hover:bg-nature-forest/5 flex items-center gap-2 border-b border-gray-100"
                    type="button"
                  >
                    <UserCircle2 size={16} />
                    View Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  type="button"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {loadingUser && (
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white/60 text-gray-500">
            <UserCircle2 size={18} />
            <span className="text-sm">Checking...</span>
          </div>
        )}
      </div>
    </motion.header>
  )
}