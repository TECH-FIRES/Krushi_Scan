/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy Nature Theme
        'nature': {
          'forest': '#2D5A27',
          'earth': '#4B3621',
          'sage': '#F0F4F0',
          'leaf': '#7CB342',
          'soil': '#795548',
          'sky': '#E3F2FD',
        },

        // BIOPHILIC: Deep forest greens & earth tones (Professional)
        'forest': {
          50: '#F1F5F3',
          100: '#D9E8E3',
          200: '#B8D5CF',
          300: '#7FA99B',
          400: '#5A8F7F',
          500: '#3D7063',
          600: '#2D5348',
          700: '#1B4332',
          800: '#0F2818',
          900: '#051B11',
        },
        'sage': {
          50: '#F7FBF8',
          100: '#E8F4ED',
          200: '#D2EBDD',
          300: '#B1E0CC',
          400: '#95D5B2',
          500: '#52B788',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#0F2818',
        },
        'soil': {
          50: '#FBF9F7',
          100: '#F4EDEA',
          200: '#E8D9D1',
          300: '#D4BFB2',
          400: '#B8956A',
          500: '#8D7B68',
          600: '#6B5B47',
          700: '#4A3C2A',
        },
        'harvest': {
          50: '#FFFAF0',
          100: '#FFF4D6',
          200: '#FFE7AC',
          300: '#FFD882',
          400: '#FFB300',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        'stone': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716B',
          600: '#57534E',
          700: '#44403C',
          900: '#1C1917',
        },

        // PLAYFUL: Vibrant spring leaf & juicy colors (Modern)
        'spring': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#57CC99',
          500: '#4ADE80',
          600: '#22C55E',
          700: '#16A34A',
          800: '#15803D',
        },
        'electric': {
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BFE5AD',
          400: '#80ED99',
          500: '#65A30D',
          600: '#4D7C0F',
          700: '#3F6212',
        },
        'juicy': {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDB366',
          400: '#FF9F1C',
          500: '#FB923C',
          600: '#EA580C',
          700: '#C2410C',
        },
        'berry': {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#9B5DE5',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        'solar': {
          50: '#FFFDF0',
          100: '#FFFBEB',
          200: '#FEF3C7',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        'sky': {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        'charcoal': {
          50: '#F8F9FA',
          100: '#F0F1F3',
          200: '#DDE1E6',
          300: '#C1C7CD',
          400: '#878D96',
          500: '#525252',
          600: '#393939',
          700: '#262626',
          900: '#161616',
        },
      },

      fontFamily: {
        'serif-display': ['Fraunces', 'Playfair Display', 'serif'],
        'display': ['Quicksand', 'Fredoka', 'sans-serif'],
        'sans': ['Quicksand', 'Fredoka', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },

      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },

      borderRadius: {
        '2xs': '0.5rem',
        'xs': '0.75rem',
        'sm': '1rem',
        'default': '1.25rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '2.5rem',
        '2xl': '3rem',
        '3xl': '3.5rem',
        'squircle': '2rem',
        'squircle-xl': '2.5rem',
      },

      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
      },

      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'spring-md': '0 4px 16px rgba(87, 204, 153, 0.18)',
        'spring-lg': '0 8px 24px rgba(87, 204, 153, 0.25)',
        'spring-glow': '0 0 20px rgba(87, 204, 153, 0.4)',
        'juicy-lg': '0 8px 24px rgba(255, 159, 28, 0.35)',
        'juicy-glow': '0 0 24px rgba(255, 159, 28, 0.5)',
      },

      animation: {
        // Biophilic animations
        'sway': 'sway 4s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'glow-soft': 'glow-soft 3s ease-in-out infinite',
        'leaf-drift': 'leaf-drift 6s ease-in-out infinite',
        'soil-settle': 'soil-settle 4s ease-out',
        
        // Playful animations
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-float': 'pulse-float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'liquid-fill': 'liquid-fill 2s ease-in-out forwards',
        'squish': 'squish 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },

      keyframes: {
        // Biophilic keyframes
        'sway': {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(2px) rotate(0.5deg)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        },
        'glow-soft': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(45, 90, 39, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(45, 90, 39, 0.35)' },
        },
        'leaf-drift': {
          '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(20px) rotate(180deg)', opacity: '0' },
        },
        'soil-settle': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        // Playful keyframes
        'bounce-in': {
          '0%': { transform: 'scale(0.9) translateY(10px)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-float': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(-6px)', opacity: '0.95' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(87, 204, 153, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(87, 204, 153, 0.6)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
        'liquid-fill': {
          '0%': { width: '0%', opacity: '0.5' },
          '100%': { width: '100%', opacity: '1' },
        },
        'squish': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
