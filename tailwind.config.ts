import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nature-Glassmorphism Theme
        'nature': {
          'forest': '#2D5A27',  // Forest Green - Primary
          'earth': '#4B3621',   // Earth Brown - Secondary
          'sage': '#F0F4F0',    // Soft Sage - Background
          'leaf': '#7CB342',    // Leaf Green - Accent
          'soil': '#795548',    // Soil Brown - Dark Accent
          'sky': '#E3F2FD',     // Light Sky - Secondary BG
        },
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
        'lg': '8px',
        'xl': '16px',
        '2xl': '24px',
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
      },
    },
  },
  plugins: [],
}
export default config
