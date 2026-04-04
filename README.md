# KRUSHI SCAN - AI-Powered Smart Agriculture Dashboard

A modern, fully-responsive web application for intelligent farm monitoring, disease detection, and crop optimization using AI and IoT sensors.

## 🌟 Features

- **Real-Time Dashboard** - Live sensor data visualization with interactive charts
- **AI Disease Scanner** - Upload leaf images for instant disease detection with confidence scores
- **Regional Intelligence** - State > District based crop recommendations considering soil and weather
- **IoT Telemetry** - Monitor raw JSON data from ESP32 sensor nodes with online/offline status
- **Glassmorphism UI** - Modern nature-inspired design with smooth animations
- **Fully Responsive** - Desktop sidebar and mobile bottom navigation
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom nature-inspired theme
- **Components**: Radix UI, Shadcn/UI compatible
- **Charts**: Recharts for sensor data visualization
- **Animations**: Framer Motion for smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and navigate to project:**
```bash
cd krushi_scan
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
krushi_scan/
├── app/                    # Next.js App Router
│   ├── api/               # API Route Handlers
│   │   ├── predict/       # AI disease detection endpoint
│   │   ├── sensors/       # Real-time sensor data stream
│   │   └── weather/       # Regional weather API
│   ├── dashboard/         # Main dashboard page
│   ├── scan/             # AI disease scanner page
│   ├── intelligence/     # Regional intelligence page
│   ├── telemetry/        # IoT telemetry page
│   ├── globals.css       # Global styles with animations
│   ├── layout.tsx        # Root layout with sidebar
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── StatCard.tsx
│   │   └── AlertFeed.tsx
│   ├── charts/          # Chart components
│   │   └── MoistureChart.tsx
│   └── layout/          # Layout components
│       ├── Sidebar.tsx
│       └── MobileNav.tsx
├── hooks/               # Custom React hooks
│   ├── useIoTData.ts
│   └── useWeather.ts
├── lib/                 # Utility functions
│   └── cn.ts           # Tailwind class merging
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🎨 Design System

### Color Palette
- **Forest Green** (#2D5A27) - Primary
- **Earth Brown** (#4B3621) - Secondary
- **Soft Sage** (#F0F4F0) - Background
- **Leaf Green** (#7CB342) - Accent

### Components

#### StatCard
Display real-time sensor readings with status indicators.
```tsx
<StatCard
  label="Soil Moisture"
  value="65.3%"
  icon={Droplets}
  color="text-blue-500"
  bgColor="bg-blue-50"
  status="optimal"
/>
```

#### Glass Cards
Glassmorphism effect for modern UI.
```tsx
<div className="glass-card glass-card-hover p-6">
  Content here
</div>
```

## 📊 API Endpoints

### POST /api/predict
Upload leaf image for disease detection.

**Request:**
```javascript
const formData = new FormData()
formData.append('image', file)
const response = await fetch('/api/predict', { method: 'POST', body: formData })
```

**Response:**
```json
{
  "disease": "Early Blight",
  "confidence": 87,
  "treatment": "Apply fungicide containing mancozeb..."
}
```

### GET /api/sensors
Stream real-time sensor data (Server-Sent Events).

### GET /api/weather
Get regional weather and forecast.

**Query Parameters:**
- `state` - State name
- `district` - District name

## 🛠 Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Radix UI, Headless UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## 📱 Responsive Design

- **Desktop**: Persistent left sidebar with full navigation
- **Tablet**: Sidebar with responsive grid
- **Mobile**: Collapsible navigation with bottom action bar

## 🔧 Customization

### Adding New Pages

1. Create folder: `app/my-page/`
2. Create `page.tsx` inside
3. Add navigation link in Sidebar.tsx

### Modifying Theme

Edit `tailwind.config.ts`:
```typescript
colors: {
  'nature': {
    'forest': '#2D5A27',
    'earth': '#4B3621',
    // ... more colors
  },
}
```

### Adding New API Routes

Create file: `app/api/route-name/route.ts`
```typescript
export async function GET(request: NextRequest) {
  // Handle request
  return NextResponse.json(data)
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t krushi-scan .
docker run -p 3000:3000 krushi-scan
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📝 Mock Data

The application uses mock data for demonstration. To integrate real data:

1. **Sensors**: Replace mock data in `/api/sensors` with real IoT feeds
2. **AI Predictions**: Connect to actual ML model (TensorFlow.js, PyTorch, etc.)
3. **Weather**: Integrate OpenWeatherMap or similar API
4. **Crops**: Replace hardcoded database with backend service

## 🔒 Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WEATHER_API_KEY=your_key
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)
- [Recharts](https://recharts.org)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - Free for personal and commercial use

## 🎯 Roadmap

- [ ] Real ESP32 IoT integration
- [ ] TensorFlow.js disease detection
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Weather integration APIs
- [ ] User authentication & multi-farm support
- [ ] PostgreSQL database backend
- [ ] WebSocket real-time updates

## 💬 Support

For issues and questions:
- GitHub Issues
- Email support
- Documentation wiki

---

**KRUSHI SCAN** - Transforming Agriculture with AI & IoT 🌾🤖

Made with ❤️ for sustainable farming
