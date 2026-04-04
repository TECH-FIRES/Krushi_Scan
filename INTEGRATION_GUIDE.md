# 🌿 Integration Steps: Adding Biophilic Design to Krushi_Scan

## Quick Start (5 minutes)

### Step 1: Merge Tailwind Config

**Open**: `tailwind.config.js` (or `tailwind.config.ts`)

**Add:**
```javascript
// At the top
import colors from 'tailwindcss/colors'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ===== ADD THIS ENTIRE SECTION =====
      colors: {
        forest: {
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
        sage: {
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
        soil: {
          50: '#FBF9F7',
          100: '#F4EDEA',
          200: '#E8D9D1',
          300: '#D4BFB2',
          400: '#B8956A',
          500: '#8D7B68',
          600: '#6B5B47',
          700: '#4A3C2A',
        },
        harvest: {
          50: '#FFFAF0',
          100: '#FFF4D6',
          200: '#FFE7AC',
          300: '#FFD882',
          400: '#FFB300',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        stone: {
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

      fontFamily: {
        'serif-display': ['Fraunces', 'Playfair Display', 'serif'],
        'sans': ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
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
      },

      boxShadow: {
        'leaf-sm': '0 2px 8px rgba(27, 67, 50, 0.08)',
        'leaf-md': '0 4px 16px rgba(27, 67, 50, 0.12)',
        'leaf-lg': '0 8px 24px rgba(27, 67, 50, 0.15)',
        'leaf-xl': '0 12px 32px rgba(27, 67, 50, 0.18)',
        'warm-sm': '0 2px 8px rgba(184, 149, 106, 0.08)',
        'warm-md': '0 4px 16px rgba(184, 149, 106, 0.12)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(27, 67, 50, 0.05)',
      },

      keyframes: {
        sway: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-2px) rotate(0.5deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.02)' },
        },
        'glow-soft': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(149, 213, 178, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(149, 213, 178, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.5)' 
          },
        },
        'leaf-drift': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(4px) translateY(-2px) rotate(1deg)' },
          '50%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateX(-4px) translateY(-2px) rotate(-1deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
        },
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
      // ===== END SECTION =====
    },
  },
  plugins: [
    // Add this plugin
    function({ addComponents, theme }) {
      addComponents({
        '.glass-leaf': {
          '@apply backdrop-blur-lg': {},
          'background': 'rgba(255, 255, 255, 0.80)',
          'background-image': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(149, 213, 178, 0.1) 100%)',
          'border': '1px solid rgba(255, 255, 255, 0.4)',
          'box-shadow': '0 4px 20px rgba(27, 67, 50, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        },
        '.glass-soil': {
          '@apply backdrop-blur-xl': {},
          'background': 'rgba(255, 255, 255, 0.75)',
          'background-image': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(184, 149, 106, 0.08) 100%)',
          'border': '1px solid rgba(255, 255, 255, 0.35)',
          'box-shadow': '0 4px 24px rgba(184, 149, 106, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
        },
        '.btn-organic': {
          '@apply px-6 py-3 rounded-2xl font-semibold transition-all duration-300': {},
          '@apply bg-forest-700 text-white shadow-leaf-md': {},
          '@apply hover:bg-forest-600 hover:shadow-leaf-lg': {},
          '@apply active:scale-95': {},
        },
        '.badge-organic': {
          '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium': {},
          '@apply bg-sage-100 text-forest-700 border border-sage-300': {},
        },
        '.badge-confidence': {
          '@apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold': {},
          'background': 'linear-gradient(135deg, rgba(255, 179, 0, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
          '@apply text-harvest-700 border border-harvest-300': {},
        },
      });
    },
  ],
}
```

### Step 2: Update Global Styles

**Open**: `app/globals.css`

**Replace the entire file with content from `globals-biophilic.css`** or append it:

```css
/* Keep existing styles, then add at the end: */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Outfit:wght@400;500;600;700;800&family=Merriweather:wght@400;700&display=swap');

/* Paste the CSS variables section and below from globals-biophilic.css */
```

### Step 3: Add DiseaseDetectionCard Component

**Copy**: `components/DiseaseDetectionCard.tsx` → your project

### Step 4: Update Layout File

**Open**: `app/layout.tsx`

**Ensure it imports the updated globals.css**:
```tsx
import './globals.css'  // This will now include all biophilic styles
```

### Step 5: Test

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ Colors are earthy (forest green, sage, soil brown)
- ✅ Glass cards have blur effect
- ✅ Fonts are serif (headings) and sans-serif (body)
- ✅ Shadows are soft (not harsh black)

---

## Component Conversion Examples

### Convert Old Card to Glass Card

```tsx
// BEFORE
<div className="bg-white rounded-lg shadow-md p-6">
  <h2>Card Title</h2>
  <p>Content here</p>
</div>

// AFTER
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="glass-leaf-card rounded-3xl p-8"
>
  <motion.h2 variants={itemVariants} className="font-serif-display text-2xl font-bold text-forest-700">
    Card Title
  </motion.h2>
  <motion.p variants={itemVariants} className="text-stone-700">
    Content here
  </motion.p>
</motion.div>
```

### Convert Old Button to Organic Button

```tsx
// BEFORE
<button className="bg-green-600 text-white px-4 py-2 rounded">
  Click
</button>

// AFTER
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  className="btn-organic"
>
  Click
</motion.button>
```

### Convert Old Badge to Organic Badge

```tsx
// BEFORE
<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
  Active
</span>

// AFTER
<motion.span
  variants={badgeVariants}
  className="badge-organic"
>
  Active
</motion.span>
```

---

## Page-by-Page Guide

### Dashboard Page

```tsx
// app/dashboard/page.tsx
import DiseaseDetectionCard from '@/components/DiseaseDetectionCard'
import { motion } from 'framer-motion'

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-stone-50 p-6 md:p-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif-display text-4xl font-bold text-forest-700 mb-2"
        >
          Welcome back, Farmer
        </motion.h1>

        {/* Glass Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {/* Stats cards */}
          <motion.div variants={itemVariants} className="glass-leaf-card p-6">
            <h3 className="font-serif text-sm text-stone-600">Total Scans</h3>
            <p className="text-3xl font-bold text-forest-700">24</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
```

### Scanner Page

```tsx
// app/scan/page.tsx
// Use the new DiseaseDetectionCard component after analysis

import DiseaseDetectionCard from '@/components/DiseaseDetectionCard'

// In your handleAnalyze function:
if (prediction) {
  return (
    <DiseaseDetectionCard
      result={prediction}
      imageUrl={preview}
      onSave={() => savePrediction()}
      onAnalyzeAnother={() => handleReset()}
    />
  )
}
```

---

## Troubleshooting

### Issue: Colors not appearing

**Solution**: Clear cache and restart dev server
```bash
rm -rf .next
npm run dev
```

### Issue: Glass blur not working

**Solution**: Ensure backdrop-filter is supported (99% of modern browsers)
Add fallback:
```css
.glass-leaf-card {
  background: rgba(255, 255, 255, 0.95); /* Fallback */
  backdrop-filter: blur(12px);
}
```

### Issue: Animations feel jerky

**Solution**: Use `will-change` and reduce animation count
```css
.animated-element {
  will-change: transform;
  animation: smooth-animation 0.3s ease-out; /* Shorter = smoother */
}
```

### Issue: Fonts not loading

**Solution**: Check Google Fonts import in `globals-biophilic.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&display=swap');
```

---

## Performance Checklist

- [ ] Use CSS variables for colors (automatic dark mode support)
- [ ] Lazy load images with loading="lazy"
- [ ] Reduce blur > 16px (performance cost)
- [ ] Use `will-change` selectively
- [ ] Test on real mobile devices (not just Chrome DevTools)
- [ ] Check Lighthouse score (target: 90+)

---

## Mobile First Approach

All components are designed mobile-first:

```tsx
// Responsive classes (mobile → tablet → desktop)
className="p-4 md:p-8 lg:p-12"   // Padding
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"  // Layouts
className="text-sm md:text-base lg:text-lg"  // Typography
className="h-32 md:h-48 lg:h-64"  // Heights
```

---

## Dark Mode Support (Future)

To add dark mode, add to `tailwind.config.js`:

```javascript
darkMode: 'class',  // or 'media'

extend: {
  colors: {
    dark: {
      bg: '#0f1419',
      card: 'rgba(30, 35, 40, 0.8)',
    }
  }
}
```

Then use: `dark:bg-dark-bg dark:text-white`

---

## Final Validation

Run this in your project:

```bash
# Check for CSS errors
npx stylelint "app/**/*.css"

# Check TypeScript
npx tsc --noEmit

# Build test
npm run build

# Performance check
npx lighthouse http://localhost:3000 --view
```

All green ✅ = Ready to deploy! 🚀

---

## Questions?

Refer to:
- `BIOPHILIC_DESIGN_GUIDE.md` - Complete design system documentation
- `components/DiseaseDetectionCard.tsx` - Production-ready component example
- Framer Motion docs: https://www.framer.com/motion/
