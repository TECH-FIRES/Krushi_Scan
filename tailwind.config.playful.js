/** @type {import('tailwindcss').Config} */

// PLAYFUL BIOPHILIC DESIGN SYSTEM FOR KRUSHI_SCAN
// Vibrant, friendly, and approachable while maintaining professional AI feel

export const extend = {
  // ========== PLAYFUL COLOR PALETTE ==========
  colors: {
    // Primary: Vibrant Spring Leaf & Electric Lime
    'spring': {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#57CC99',  // PRIMARY SPRING LEAF
      500: '#4ADE80',
      600: '#22C55E',
      700: '#16A34A',
      800: '#15803D',
    },

    // Electric: Bright, energetic lime
    'electric': {
      50: '#F7FEE7',
      100: '#ECFCCB',
      200: '#D9F99D',
      300: '#BFE5AD',
      400: '#80ED99',  // PRIMARY ELECTRIC LIME
      500: '#65A30D',
      600: '#4D7C0F',
      700: '#3F6212',
    },

    // Call-to-Action: Juicy Orange (warm, inviting)
    'juicy': {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDB366',
      400: '#FF9F1C',  // PRIMARY JUICY ORANGE
      500: '#FB923C',
      600: '#EA580C',
      700: '#C2410C',
    },

    // Alert: Berry Purple (rare disease warnings)
    'berry': {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#9B5DE5',  // PRIMARY BERRY PURPLE
      600: '#7C3AED',
      700: '#6D28D9',
    },

    // Backgrounds: Solar Yellow & Sky Blue
    'solar': {
      50: '#FFFDF0',  // PRIMARY SOLAR YELLOW
      100: '#FFFBEB',
      200: '#FEF3C7',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
    },

    'sky': {
      50: '#F0F9FF',  // PRIMARY SKY BLUE
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#0EA5E9',
    },

    // Soft pastels for Bento boxes
    'pastel': {
      mint: '#E0F8F4',
      peach: '#FFE7D9',
      lavender: '#F3E8FF',
      butter: '#FEF9E7',
      rose: '#FFE5EC',
      sky: '#E0F2FE',
    },

    // Neutral: Charcoal (friendly, not too dark)
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

  // ========== PLAYFUL FONTS ==========
  fontFamily: {
    // Rounded, friendly sans-serif
    'display': ['Quicksand', 'Fredoka', 'Outfit', 'sans-serif'],
    'sans': ['Quicksand', 'Fredoka', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    
    // Keep serif for premium moments
    'serif': ['Merriweather', 'Georgia', 'serif'],
  },

  // ========== PLAYFUL SPACING & BORDER RADIUS ==========
  borderRadius: {
    'xs': '0.5rem',
    'sm': '0.75rem',
    'md': '1rem',
    'lg': '1.5rem',
    'xl': '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    'squircle': '2rem',      // Squircle effect
    'squircle-lg': '2.5rem', // Larger squircle
    'squircle-xl': '3rem',   // Extra large squircle
    'full': '9999px',
  },

  // ========== PLAYFUL SHADOWS (Colored, not black) ==========
  boxShadow: {
    // Spring green glow
    'spring-sm': '0 2px 8px rgba(87, 204, 153, 0.12)',
    'spring-md': '0 4px 16px rgba(87, 204, 153, 0.18)',
    'spring-lg': '0 8px 24px rgba(87, 204, 153, 0.25)',
    'spring-xl': '0 12px 32px rgba(87, 204, 153, 0.3)',
    'spring-glow': '0 0 20px rgba(87, 204, 153, 0.4)',

    // Juicy orange glow (for CTAs)
    'juicy-sm': '0 2px 8px rgba(255, 159, 28, 0.15)',
    'juicy-md': '0 4px 16px rgba(255, 159, 28, 0.25)',
    'juicy-lg': '0 8px 24px rgba(255, 159, 28, 0.35)',
    'juicy-glow': '0 0 24px rgba(255, 159, 28, 0.5)',

    // Berry purple glow (for alerts)
    'berry-md': '0 4px 16px rgba(155, 93, 229, 0.2)',
    'berry-glow': '0 0 24px rgba(155, 93, 229, 0.3)',

    // Pale glow (for soft cards)
    'soft-glow': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.08)',
  },

  // ========== PLAYFUL ANIMATIONS ==========
  keyframes: {
    // Bouncy entrance
    'bounce-in': {
      '0%': { transform: 'scale(0.9) translateY(10px)', opacity: '0' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },

    // Squish on click
    'squish': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(0.95)' },
      '100%': { transform: 'scale(1)' },
    },

    // Liquid fill (scanner progress)
    'liquid-fill': {
      '0%': { 
        height: '0%',
        opacity: '0.5',
        backgroundPosition: '0% 0%',
      },
      '100%': { 
        height: '100%',
        opacity: '1',
        backgroundPosition: '100% 100%',
      },
    },

    // Subtle pulse for floating buttons
    'pulse-float': {
      '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
      '50%': { transform: 'translateY(-4px)', opacity: '0.95' },
    },

    // Shimmer effect (loading state)
    'shimmer': {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },

    // Rotate for spinner
    'spin-smooth': {
      'from': { transform: 'rotate(0deg)' },
      'to': { transform: 'rotate(360deg)' },
    },

    // Rainbow confetti-like glow
    'glow-pulse': {
      '0%, 100%': { boxShadow: '0 0 20px rgba(87, 204, 153, 0.3)' },
      '50%': { boxShadow: '0 0 40px rgba(87, 204, 153, 0.6)' },
    },

    // Wiggle (playful micro-interaction)
    'wiggle': {
      '0%, 100%': { transform: 'rotate(0deg)' },
      '25%': { transform: 'rotate(-2deg)' },
      '75%': { transform: 'rotate(2deg)' },
    },
  },

  animation: {
    'bounce-in': 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    'squish': 'squish 0.3s ease-out',
    'liquid-fill': 'liquid-fill 2s ease-in-out forwards',
    'pulse-float': 'pulse-float 3s ease-in-out infinite',
    'shimmer': 'shimmer 2s infinite',
    'spin-smooth': 'spin-smooth 1s linear infinite',
    'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
    'wiggle': 'wiggle 0.5s ease-in-out',
  },

  // ========== GRADIENT BACKGROUNDS ==========
  backgroundImage: {
    'gradient-spring': 'linear-gradient(135deg, #57CC99 0%, #80ED99 100%)',
    'gradient-juicy': 'linear-gradient(135deg, #FF9F1C 0%, #FFB84D 100%)',
    'gradient-berry': 'linear-gradient(135deg, #9B5DE5 0%, #C084FC 100%)',
    'gradient-sky': 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)',
    'gradient-solar': 'linear-gradient(135deg, #FEF9E7 0%, #FFFDF0 100%)',
  },
};

// ========== PLUGIN: CUSTOM COMPONENTS ==========
export const plugins = [
  function({ addComponents, theme }) {
    addComponents({
      // Playful card with colored shadow
      '.card-playful': {
        '@apply rounded-squircle bg-white/80 backdrop-blur-md border border-white/40': {},
        'box-shadow': '0 4px 16px rgba(87, 204, 153, 0.15)',
        'transition': 'all 0.3s cubic-bezier(0.25, 1, 0.21, 1)',
      },

      // Bento boxes with soft colors
      '.card-bento': {
        '@apply rounded-squircle-xl p-6 backdrop-blur-md border border-white/40': {},
        'transition': 'all 0.3s cubic-bezier(0.25, 1, 0.21, 1)',
      },

      '.card-bento-mint': {
        '@apply card-bento': {},
        'background': 'rgba(224, 248, 244, 0.6)',
        'box-shadow': '0 4px 16px rgba(87, 204, 153, 0.1)',
      },

      '.card-bento-peach': {
        '@apply card-bento': {},
        'background': 'rgba(255, 231, 217, 0.5)',
        'box-shadow': '0 4px 16px rgba(255, 159, 28, 0.1)',
      },

      '.card-bento-lavender': {
        '@apply card-bento': {},
        'background': 'rgba(243, 232, 255, 0.6)',
        'box-shadow': '0 4px 16px rgba(155, 93, 229, 0.12)',
      },

      '.card-bento-sky': {
        '@apply card-bento': {},
        'background': 'rgba(224, 242, 254, 0.5)',
        'box-shadow': '0 4px 16px rgba(56, 189, 248, 0.1)',
      },

      // Playful button: Spring Green CTA
      '.btn-playful-primary': {
        '@apply px-6 py-3 rounded-squircle font-semibold transition-all duration-300': {},
        'background': 'linear-gradient(135deg, #57CC99 0%, #80ED99 100%)',
        '@apply text-white shadow-spring-md': {},
        '@apply hover:shadow-spring-lg active:scale-95': {},
      },

      // Playful button: Juicy Orange CTA (for "Start Scan")
      '.btn-playful-cta': {
        '@apply px-8 py-4 rounded-squircle-lg font-bold transition-all duration-300': {},
        'background': 'linear-gradient(135deg, #FF9F1C 0%, #FFB84D 100%)',
        '@apply text-white shadow-juicy-lg': {},
        '@apply hover:shadow-juicy-glow active:scale-95': {},
      },

      // Alert button: Berry Purple
      '.btn-playful-alert': {
        '@apply px-6 py-3 rounded-squircle font-semibold transition-all': {},
        'background': 'linear-gradient(135deg, #9B5DE5 0%, #C084FC 100%)',
        '@apply text-white shadow-berry-md': {},
        '@apply hover:shadow-berry-glow': {},
      },

      // Secondary button: Friendly outline
      '.btn-playful-secondary': {
        '@apply px-6 py-3 rounded-squircle font-semibold transition-all': {},
        '@apply bg-white/50 border-2 border-spring-400 text-spring-700': {},
        '@apply hover:bg-spring-100': {},
      },

      // Badge: Playful pill
      '.badge-playful': {
        '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold': {},
        '@apply bg-spring-100 text-spring-700 shadow-spring-sm': {},
      },

      // Badge: Alert (Berry)
      '.badge-alert': {
        '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold': {},
        '@apply bg-berry-100 text-berry-700 shadow-berry-md': {},
      },

      // Liquid progress bar container
      '.progress-liquid': {
        '@apply w-full h-4 rounded-full overflow-hidden': {},
        '@apply bg-gradient-to-r from-spring-200 to-spring-100': {},
      },

      // Heading: Playful serif display
      '.heading-playful': {
        '@apply font-display text-4xl font-bold text-charcoal-700': {},
        '@apply text-transparent bg-clip-text bg-gradient-spring': {},
      },

      // Subheading: Friendly sans
      '.subheading-playful': {
        '@apply font-display text-xl font-bold text-charcoal-700': {},
      },
    });
  },
];
