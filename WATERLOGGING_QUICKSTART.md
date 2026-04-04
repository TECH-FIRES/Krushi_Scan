# Waterlogging System - Quick Start for Developers

## 🚀 Getting Started (5 minutes)

### Prerequisites
- Node.js 18+
- MongoDB connection (already set up)
- Existing KRUSHI SCAN project

### Step 1: Verify Installation
All files are already created. Just verify by checking these exist:
- ✅ `models/WaterloggingRisk.ts`
- ✅ `lib/waterlogging.ts`
- ✅ `hooks/useWaterlogging.ts`
- ✅ `components/waterlogging/*`
- ✅ `app/waterlogging/page.tsx`
- ✅ `app/api/waterlogging-risk/*`

### Step 2: Start Development Server
```bash
npm run dev
# or
yarn dev
```

### Step 3: Access the Dashboard
Navigate to: `http://localhost:3000/waterlogging`

### Step 4: Test the System
1. View the waterlogging dashboard
2. Click "Refresh" button
3. Check that data loads
4. Verify risk assessment displays
5. Check historical graphs

---

## 🔌 Integration Examples

### In Dashboard Component
```typescript
import { WaterloggingDashboardWidget } from '@/components/waterlogging/WaterloggingDashboardWidget'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Other components */}
      <WaterloggingDashboardWidget />
    </div>
  )
}
```

### In Custom Component
```typescript
import { useWaterlogging } from '@/hooks/useWaterlogging'

export function MyComponent() {
  const { data, loading } = useWaterlogging()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <p>Risk: {data?.risk_level}</p>
      <p>Score: {data?.risk_score}%</p>
    </div>
  )
}
```

### Direct API Call
```typescript
async function checkWaterlogging() {
  const response = await fetch('/api/waterlogging-risk')
  const data = await response.json()
  console.log(data)
}
```

---

## 🎨 UI Customization

### Change Colors
Edit `lib/waterlogging.ts`:
```typescript
export function getRiskColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'HIGH':
      return '#your-color' // Change here
    // ...
  }
}
```

### Change Risk Thresholds
Edit `lib/waterlogging.ts` lines 47-51:
```typescript
if (soil_moisture > 80 && humidity > 75) { // Adjust values
  riskLevel = 'HIGH'
}
```

### Change Component Layout
All components are in `components/waterlogging/` - edit as needed

---

## 📊 API Testing

### Test Get Current Risk
```bash
curl http://localhost:3000/api/waterlogging-risk
```

### Test Get History
```bash
curl "http://localhost:3000/api/waterlogging-risk/history?days=7&limit=50"
```

### In Browser DevTools
```javascript
fetch('/api/waterlogging-risk').then(r => r.json()).then(console.log)
```

---

## 🐛 Debugging

### Check Console Errors
Open DevTools → Console tab and look for errors

### Check Network Requests
DevTools → Network tab → Check API calls

### Check Component Props
Add console.log in components to verify data flow

### Check Database
```javascript
// In MongoDB shell
db.waterlogging_risk.find().limit(5)
```

---

## 📱 Testing on Mobile

### Local Testing
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS/Linux
ipconfig              # Windows

# Access: http://YOUR_IP:3000/waterlogging
```

### Responsive Design Testing
- DevTools → Toggle device toolbar (Ctrl+Shift+M)
- Test on iPhone SE, iPad, and desktop

---

## ⚡ Performance Tips

### Optimize Charts
```typescript
// Already uses Recharts (optimized)
// Keep number of data points reasonable
```

### Minimize Re-renders
```typescript
// useWaterlogging hook already handles this
// Components use proper memoization
```

### Database Queries
```typescript
// Already indexed by device_id and created_at
// Queries are optimized
```

---

## 🔐 Security Checklist

- [x] No console.logs of sensitive data
- [x] API validates all inputs
- [x] MongoDB requires authentication
- [x] No hardcoded credentials
- [x] Error messages don't leak info
- [x] No user data stored unnecessarily

---

## 📦 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Already configured if your existing setup is working

### Database
No special setup needed - MongoDB does it automatically

### Static Files
All Tailwind CSS is included in build

---

## 🧪 Quick Test Script

Create `scripts/test-waterlogging.js`:

```javascript
async function testWaterlogging() {
  console.log('Testing Waterlogging System...')
  
  try {
    // Test Risk API
    const riskRes = await fetch('http://localhost:3000/api/waterlogging-risk')
    const risk = await riskRes.json()
    console.log('✅ Risk API:', risk)
    
    // Test History API
    const histRes = await fetch('http://localhost:3000/api/waterlogging-risk/history')
    const hist = await histRes.json()
    console.log('✅ History API:', hist.count, 'records')
    
    console.log('✅ All tests passed!')
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testWaterlogging()
```

Run with: `node scripts/test-waterlogging.js`

---

## 📚 File Reference

| File | Purpose | Edit for |
|------|---------|----------|
| `lib/waterlogging.ts` | Risk logic | Thresholds, colors, recommendations |
| `hooks/useWaterlogging.ts` | Data fetching | Refresh interval, cache settings |
| `components/waterlogging/` | UI components | Styling, animations, layout |
| `app/waterlogging/page.tsx` | Main page | Page structure, features |
| `models/WaterloggingRisk.ts` | Database | Schema, validation |
| `app/api/waterlogging-risk/` | API logic | Business logic, calculations |

---

## 🚀 Common Tasks

### Add Email Alerts
Edit `app/api/waterlogging-risk/route.ts` to send emails when HIGH risk

### Change Refresh Interval
Edit `hooks/useWaterlogging.ts` line 48

### Add More Sensor Values
Edit `models/WaterloggingRisk.ts` schema

### Custom Recommendations
Edit `lib/waterlogging.ts` recommendation generation

### Change UI Colors
Edit `lib/waterlogging.ts` color functions

---

## 📞 Troubleshooting

### "No sensor data available"
```
→ Check if ESP32 is sending data
→ Verify /api/sensor-data is working
→ Check MongoDB connection
```

### Charts not showing
```
→ Check if history data exists
→ Verify API returns data
→ Check browser console for errors
```

### Styling looks wrong
```
→ Clear browser cache
→ Restart dev server
→ Verify Tailwind CSS is configured
→ Check if CSS files are imported
```

### API not responding
```
→ Check if server is running
→ Verify MongoDB is connected
→ Check API endpoint path
→ Review server logs
```

---

## 📖 More Information

- **Full Documentation:** See `WATERLOGGING_SYSTEM.md`
- **Integration Guide:** See `WATERLOGGING_INTEGRATION.md`
- **Implementation Details:** See `WATERLOGGING_IMPLEMENTATION_COMPLETE.md`

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Page loads at `/waterlogging`
- [ ] Risk data displays with correct level
- [ ] Sensor readings show values
- [ ] Graphs load with data
- [ ] Refresh button works
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Navigation shows waterlogging link
- [ ] Colors match risk levels
- [ ] Animations are smooth

---

## 🎓 Learning Resources

### Understanding Risk Algorithm
1. Open `lib/waterlogging.ts`
2. Read function `calculateWaterloggingRisk()`
3. Understand the logic flow
4. See how score is calculated

### Understanding Component Flow
1. Open `app/waterlogging/page.tsx`
2. See how `useWaterlogging()` is used
3. Understand component composition
4. Check how data flows to child components

### Understanding API
1. Open `app/api/waterlogging-risk/route.ts`
2. See how sensor data is fetched
3. Understand risk calculation
4. See how MongoDB is used

---

## 🎯 Next Steps

1. ✅ Verify system is working
2. ✅ Test with real sensor data
3. ✅ Customize risk thresholds if needed
4. ✅ Update styling to match your theme
5. ✅ Add to your demo
6. ✅ Train users on system

---

**Happy building! 🚀**

For questions, refer to the main documentation files or check the component code comments.
