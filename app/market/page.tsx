"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Building2, Tractor, MapPin, Calculator, TrendingUp, 
  Mic, Languages, Loader, ArrowRight
} from 'lucide-react';

interface MarketData {
  id: number;
  name: string;
  distance: number;
  pricePerTon: number;
  transportCostPerTon: number;
  totalRevenue: number;
  totalTransport: number;
  netProfit: number;
}

interface PriceData {
  month: string;
  price: number;
  type: string;
}

interface AnalysisResult {
  crop: string;
  yieldCalculated: number;
  bestMarket: MarketData;
  nearestMarket: MarketData;
  markets: MarketData[];
  priceTrend: PriceData[];
  recommendation: string;
}

export default function MarketPricesPage() {
  const [formData, setFormData] = useState({
    cropName: '',
    area: '',
    expectedYield: '',
    location: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [pincode, setPincode] = useState('');
  const [isResolvingPincode, setIsResolvingPincode] = useState(false);
  const [locationError, setLocationError] = useState('');

  const isValidIndianPincode = (value: string) => /^[1-9][0-9]{5}$/.test(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Mock Voice API
    setTimeout(() => {
      setFormData({
        cropName: 'Tomato',
        area: '5',
        expectedYield: '10',
        location: 'Pune District'
      });
      setIsRecording(false);
    }, 2000);
  };

  const handleDetectLocation = async () => {
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const reverseGeoResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      if (!reverseGeoResponse.ok) {
        throw new Error('Unable to resolve location name.');
      }

      const geoData = await reverseGeoResponse.json();
      const address = geoData?.address || {};
      const cityLike = address.city || address.town || address.village || address.hamlet || '';
      const districtLike = address.state_district || address.county || address.state || '';
      const detectedPincode = typeof address.postcode === 'string' ? address.postcode.replace(/\D/g, '') : '';

      const readableLocation = [cityLike, districtLike]
        .filter(Boolean)
        .filter((item, index, array) => array.indexOf(item) === index)
        .join(', ');

      setFormData((prev) => ({
        ...prev,
        location: readableLocation || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
      }));

      if (detectedPincode && isValidIndianPincode(detectedPincode)) {
        setPincode(detectedPincode);
      }
    } catch (error: any) {
      if (error?.code === 1) {
        setLocationError('Location access denied. Please allow location permission.');
      } else if (error?.code === 2) {
        setLocationError('Unable to detect your location right now.');
      } else if (error?.code === 3) {
        setLocationError('Location request timed out. Please try again.');
      } else {
        setLocationError('Could not fetch location. Please enter it manually.');
      }
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const resolveLocationFromPincode = async (pin: string) => {
    setLocationError('');

    if (!isValidIndianPincode(pin)) {
      setLocationError('Please enter a valid Indian PIN code (6 digits, starting 1-9).');
      return;
    }

    setIsResolvingPincode(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=in&postalcode=${pin}&limit=1`
      );

      if (!response.ok) {
        throw new Error('PIN resolution failed');
      }

      const results = await response.json();
      if (!Array.isArray(results) || results.length === 0) {
        setLocationError('PIN code not found. Please check and try again.');
        return;
      }

      const address = results[0]?.address || {};
      const cityLike = address.city || address.town || address.village || address.hamlet || '';
      const districtLike = address.state_district || address.county || address.state || '';

      const readableLocation = [cityLike, districtLike]
        .filter(Boolean)
        .filter((item, index, array) => array.indexOf(item) === index)
        .join(', ');

      setFormData((prev) => ({
        ...prev,
        location: readableLocation || prev.location,
      }));
    } catch {
      setLocationError('Could not resolve this PIN code right now. Please try again.');
    } finally {
      setIsResolvingPincode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/crop-price-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-nature-sage p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-nature-forest mb-2 flex items-center gap-3">
            <TrendingUp size={36} />
            Smart Crop Pricing
          </h1>
          <p className="text-gray-600">AI-powered price prediction and market recommendations</p>
        </div>
        
        {/* Language & History Toggles Mock */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600 hover:text-nature-forest transition">
            <Languages size={18} /> English / हिन्दी
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Farm Details</h2>
              <button 
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-full transition ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-nature-forest/10 text-nature-forest hover:bg-nature-forest/20'}`}
                title="Use Voice Input"
              >
                <Mic size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tractor size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleInputChange}
                    placeholder="e.g. Tomato, Wheat, Cotton"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area of Land (Acres)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g. 5"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Yield in Tons (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calculator size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="expectedYield"
                    value={formData.expectedYield}
                    onChange={handleInputChange}
                    placeholder="Auto-calculated if blank"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter city or district"
                    required
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="px-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 disabled:opacity-60"
                    title="Detect Location"
                  >
                    {isDetectingLocation ? <Loader size={18} className="animate-spin" /> : <MapPin size={18} />}
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      const numericPin = e.target.value.replace(/\D/g, '');
                      setPincode(numericPin);
                      if (numericPin.length === 6) {
                        resolveLocationFromPincode(numericPin);
                      }
                    }}
                    placeholder="Enter Indian PIN code"
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => resolveLocationFromPincode(pincode)}
                    disabled={isResolvingPincode || pincode.length !== 6}
                    className="px-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 disabled:opacity-60"
                    title="Resolve PIN"
                  >
                    {isResolvingPincode ? <Loader size={18} className="animate-spin" /> : 'PIN'}
                  </button>
                </div>
                {locationError && <p className="text-xs text-red-500 mt-1">{locationError}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !formData.cropName}
                className="w-full mt-4 bg-gradient-forest text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader className="animate-spin" size={18} /> : <span>Analyze Markets <ArrowRight size={18}/></span>}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Results Column */}
        <motion.div 
          className="lg:col-span-8 space-y-6"
        >
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <Building2 size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Ready to maximize your profits?</h3>
                <p className="text-gray-500 max-w-md mt-2">Enter your crop details to let our AI compare live market prices, calculate transport logistics, and predict the best time and place to sell.</p>
              </motion.div>
            ) : loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <Loader size={48} className="text-nature-forest animate-spin mb-4" />
                <h3 className="text-lg font-medium text-gray-800">Algorithms computing...</h3>
                <p className="text-gray-500">Checking APMC prices, calculating transport margins, generating trend paths...</p>
              </motion.div>
            ) : result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* AI Insight Alert */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-100 border border-green-200 p-4 rounded-xl flex items-start gap-4 shadow-sm">
                  <div className="bg-white p-2 rounded-full shadow-sm text-green-600 mt-1">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 text-lg">AI Market Intelligence</h3>
                    <p className="text-green-800">{result.recommendation}</p>
                  </div>
                </div>

                {/* Top KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Best Market Card */}
                  <div className="glass-card p-5 border-l-4 border-l-nature-forest bg-white">
                    <p className="text-sm font-medium text-gray-500 flex justify-between">
                      <span className="flex items-center gap-1"><Building2 size={16}/> Highest Profit Market</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Recommended</span>
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{result.bestMarket.name}</h3>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500">Net Expected Profit</p>
                        <p className="text-3xl font-black text-nature-forest">
                          {formatCurrency(result.bestMarket.netProfit)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="font-semibold text-gray-800">{result.bestMarket.distance} km</p>
                      </div>
                    </div>
                  </div>

                  {/* Nearest Market Card */}
                  <div className="glass-card p-5 border-l-4 border-l-orange-400 bg-white">
                    <p className="text-sm font-medium text-gray-500 flex justify-between">
                      <span className="flex items-center gap-1"><MapPin size={16}/> Nearest Alternative</span>
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{result.nearestMarket.name}</h3>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500">Net Expected Profit</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatCurrency(result.nearestMarket.netProfit)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="font-semibold text-gray-800">{result.nearestMarket.distance} km</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graph & Tables Section */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-nature-forest"/> Price Trend Forecast (Per Ton)
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.priceTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <YAxis tickFormatter={(val) => `₹${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), 'Price']}
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          name="Market Price" 
                          stroke="#2D5A27" 
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Deep Market Comparison Table */}
                <div className="glass-card p-6 overflow-x-auto">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Calculator size={20} className="text-nature-leaf"/> Detailed Margins Breakdown
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-3 font-semibold rounded-tl-lg">Market Hub</th>
                        <th className="p-3 font-semibold border-l border-white/50">Price/Ton</th>
                        <th className="p-3 font-semibold border-l border-white/50">Transport Cost</th>
                        <th className="p-3 font-semibold border-l border-white/50">Revenue</th>
                        <th className="p-3 font-semibold rounded-tr-lg border-l border-white/50">Final Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.markets.map((m, idx) => (
                        <tr key={m.id} className={`border-b border-gray-100 last:border-0 ${idx === 0 ? 'bg-green-50/50' : 'hover:bg-gray-50'}`}>
                          <td className="p-3 font-medium text-gray-800">
                            {m.name} <span className="block text-xs text-gray-500 font-normal">{m.distance} km away</span>
                          </td>
                          <td className="p-3 text-gray-600">{formatCurrency(m.pricePerTon)}</td>
                          <td className="p-3 text-orange-600">-{formatCurrency(m.transportCostPerTon * result.yieldCalculated)}</td>
                          <td className="p-3 text-gray-600">{formatCurrency(m.totalRevenue)}</td>
                          <td className="p-3 font-bold text-nature-forest">{formatCurrency(m.netProfit)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </div>
  );
}