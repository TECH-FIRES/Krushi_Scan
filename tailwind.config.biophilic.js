/** @type {import('tailwindcss').Config} */

// BIOPHILIC DESIGN SYSTEM FOR KRUSHI_SCAN
// This extends the base Tailwind config with organic, nature-inspired theming

export const extend = {
  // ========== CUSTOM COLOR PALETTE ==========
  colors: {
    // Primary: Deep, trustworthy greens
    'forest': {
      50: '#F1F5F3',
      100: '#D9E8E3',
      200: '#B8D5CF',
      300: '#7FA99B',
      400: '#5A8F7F',
      500: '#3D7063',
      600: '#2D5348',
      700: '#1B4332',  // PRIMARY DEEP GREEN
      800: '#0F2818',
      900: '#051B11',
    },
    
    // Secondary: Calming sage & leaf tones
    'sage': {
      50: '#F7FBF8',
      100: '#E8F4ED',
      200: '#D2EBDD',
      300: '#B1E0CC',
      400: '#95D5B2',  // PRIMARY SAGE
      500: '#52B788',
      600: '#2D6A4F',
      700: '#1B4332',
      800: '#0F2818',
    },
    
    // Accent: Soil & earth tones
    'soil': {
      50: '#FBF9F7',
      100: '#F4EDEA',
      200: '#E8D9D1',
      300: '#D4BFB2',
      400: '#B8956A',  // WARM SOIL BROWN
      500: '#8D7B68',
      600: '#6B5B47',
      700: '#4A3C2A',
    },
    
    // Alert: Harvest gold (non-aggressive)
    'harvest': {
      50: '#FFFAF0',
      100: '#FFF4D6',
      200: '#FFE7AC',
      300: '#FFD882',
      400: '#FFB300',  // PRIMARY HARVEST GOLD
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
    
    // Neutral: Stone & off-white
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
  },

  // ========== CUSTOM FONTS ==========
  fontFamily: {
    // High-end serif for headings (organic, trustworthy)
    'serif-display': ['Fraunces', 'Playfair Display', 'serif'],
    
    // Clean sans-serif for data & body (modern, readable)
    'sans': ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    
    // Alternative serif for accent text
    'serif': ['Merriweather', 'Georgia', 'serif'],
  },

  // ========== CUSTOM SPACING & BORDER RADIUS ==========
  borderRadius: {
    '2xs': '0.5rem',
    'xs': '0.75rem',
    'sm': '1rem',
    'default': '1.25rem',
    'md': '1.5rem',
    'lg': '2rem',
    'xl': '2.5rem',
    '2xl': '3rem',
    '3xl': '3.5rem',  // Organic, soft corners
    full: '9999px',
  },

  // ========== CUSTOM BOX SHADOWS (Soft, No Harsh Black) ==========
  boxShadow: {
    // Leaf shadows: diffused, organic
    'leaf-sm': '0 2px 8px rgba(27, 67, 50, 0.08)',
    'leaf-md': '0 4px 16px rgba(27, 67, 50, 0.12)',
    'leaf-lg': '0 8px 24px rgba(27, 67, 50, 0.15)',
    'leaf-xl': '0 12px 32px rgba(27, 67, 50, 0.18)',
    
    // Elevation: subtle, warm shadows
    'warm-sm': '0 2px 8px rgba(184, 149, 106, 0.08)',
    'warm-md': '0 4px 16px rgba(184, 149, 106, 0.12)',
    
    // Inner glow (for glass cards)
    'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(27, 67, 50, 0.05)',
  },

  // ========== ANIMATION CONFIGURATIONS ==========
  keyframes: {
    // Gentle organic sway
    'sway': {
      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
      '50%': { transform: 'translateY(-2px) rotate(0.5deg)' },
    },
    
    // Soft pulse (breathing effect)
    'breathe': {
      '0%, 100%': { opacity: '1', transform: 'scale(1)' },
      '50%': { opacity: '0.95', transform: 'scale(1.02)' },
    },
    
    // Gentle glow
    'glow-soft': {
      '0%, 100%': { 
        boxShadow: '0 0 20px rgba(149, 213, 178, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)' 
      },
      '50%': { 
        boxShadow: '0 0 30px rgba(149, 213, 178, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.5)' 
      },
    },
    
    // Leaf drift (floating in wind)
    'leaf-drift': {
      '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
      '25%': { transform: 'translateX(4px) translateY(-2px) rotate(1deg)' },
      '50%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
      '75%': { transform: 'translateX(-4px) translateY(-2px) rotate(-1deg)' },
      '100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
    },
    
    // Soil settling (subtle bounce down)
    'soil-settle': {
      '0%': { transform: 'translateY(-4px)', opacity: '0' },
      '50%': { opacity: '1' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },

  animation: {
    'sway': 'sway 4s ease-in-out infinite',
    'breathe': 'breathe 3s ease-in-out infinite',
    'glow-soft': 'glow-soft 3s ease-in-out infinite',
    'leaf-drift': 'leaf-drift 6s ease-in-out infinite',
    'soil-settle': 'soil-settle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // ========== CUSTOM COMPONENTS (Tailwind @apply) ==========
  backdropBlur: {
    'xs': '2px',
    'sm': '4px',
    'md': '8px',
    'lg': '12px',
    'xl': '16px',
    '2xl': '20px',
  },

  // Glass effect variants
  backgroundColor: {
    'glass-light': 'rgba(255, 255, 255, 0.75)',
    'glass-dark': 'rgba(27, 67, 50, 0.08)',
  },
};

// ========== PLUGIN: CUSTOM UTILITIES ==========
export const plugins = [
  function({ addComponents, theme }) {
    addComponents({
      // Frosted Leaf Glass: Premium card background
      '.glass-leaf': {
        '@apply backdrop-blur-lg': {},
        'background': 'rgba(255, 255, 255, 0.80)',
        'background-image': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(149, 213, 178, 0.1) 100%)',
        'border': '1px solid rgba(255, 255, 255, 0.4)',
        'box-shadow': '0 4px 20px rgba(27, 67, 50, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      },

      // Soil glass: Warmer variant for accent cards
      '.glass-soil': {
        '@apply backdrop-blur-xl': {},
        'background': 'rgba(255, 255, 255, 0.75)',
        'background-image': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(184, 149, 106, 0.08) 100%)',
        'border': '1px solid rgba(255, 255, 255, 0.35)',
        'box-shadow': '0 4px 24px rgba(184, 149, 106, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
      },

      // Premium button with organic styling
      '.btn-organic': {
        '@apply px-6 py-3 rounded-2xl font-semibold transition-all duration-300': {},
        '@apply bg-forest-700 text-white shadow-leaf-md': {},
        '@apply hover:bg-forest-600 hover:shadow-leaf-lg': {},
        '@apply active:scale-95': {},
      },

      // Data pill badge
      '.badge-organic': {
        '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium': {},
        '@apply bg-sage-100 text-forest-700 border border-sage-300': {},
      },

      // Confidence score badge (with harvest gold)
      '.badge-confidence': {
        '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold': {},
        'background': 'linear-gradient(135deg, rgba(255, 179, 0, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
        '@apply text-harvest-700 border border-harvest-300': {},
      },

      // Organic card container
      '.card-organic': {
        '@apply glass-leaf rounded-3xl p-6 md:p-8': {},
        '@apply border-stone-200': {},
      },

      // Organic section heading
      '.heading-organic': {
        '@apply font-serif-display text-3xl md:text-4xl font-bold text-forest-700': {},
        '@apply tracking-tight': {},
      },

      // Organic subheading
      '.subheading-organic': {
        '@apply font-sans text-lg md:text-xl font-semibold text-forest-600': {},
      },

      // Organic body text
      '.text-organic': {
        '@apply font-sans text-base text-stone-700 leading-relaxed': {},
      },

      // Status indicator for scanning
      '.status-scanning': {
        '@apply inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium': {},
        '@apply bg-sage-100 text-forest-700': {},
        '@apply animate-breathe': {},
      },
    });
  },
];
