'use client'

import type React from 'react'
import { useEffect } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import './globals-playful.css'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const w = window as any

    if (!document.getElementById('google_translate_element')) {
      const container = document.createElement('div')
      container.id = 'google_translate_element'
      container.style.display = 'none'
      document.body.appendChild(container)
    }

    const applyLanguage = (langCode: string, attempt = 0) => {
      const code = langCode || 'en'
      document.cookie = `googtrans=/en/${code};path=/`
      document.cookie = `googtrans=/en/${code};domain=${location.hostname};path=/`
      try {
        localStorage.setItem('krushi_selected_lang', code)
      } catch {}

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = code
        select.dispatchEvent(new Event('change'))
        return
      }

      if (attempt < 20) {
        setTimeout(() => applyLanguage(code, attempt + 1), 150)
      }
    }

    w.applyGoogleTranslateLanguage = (langCode: string) => applyLanguage(langCode)

    w.googleTranslateElementInit = () => {
      if (!w.google?.translate?.TranslateElement) return

      new w.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      )

      const savedLang = localStorage.getItem('krushi_selected_lang') || 'en'
      if (savedLang !== 'en') {
        setTimeout(() => applyLanguage(savedLang), 200)
      }
    }

    if (!document.querySelector('script[data-google-translate="true"]')) {
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.setAttribute('data-google-translate', 'true')
      document.body.appendChild(script)
    } else if (w.google?.translate?.TranslateElement) {
      w.googleTranslateElementInit()
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body className="bg-nature-sage text-gray-900 antialiased overflow-x-hidden flex flex-col min-h-screen relative" suppressHydrationWarning>
        {/* Universal Top Navigation */}
        <TopNav />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full relative">
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50">
            <div className="flex justify-around py-2 px-2 overflow-x-auto gap-4 scrollbar-hide">
              <a href="/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">📊</span>
                <span className="text-[10px] font-medium">Dash</span>
              </a>
              <a href="/scan" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">🔍</span>
                <span className="text-[10px] font-medium">Scan</span>
              </a>
              <a href="/market" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">📈</span>
                <span className="text-[10px] font-medium">Market</span>
              </a>
              <a href="/recommendations" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">💧</span>
                <span className="text-[10px] font-medium">Actions</span>
              </a>
              <a href="/intelligence" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">🌍</span>
                <span className="text-[10px] font-medium">Intel</span>
              </a>
              <a href="/resources" className="flex flex-col items-center gap-1 text-gray-600 hover:text-nature-forest transition min-w-[50px]">
                <span className="text-xl leading-none">📚</span>
                <span className="text-[10px] font-medium">Learn</span>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}