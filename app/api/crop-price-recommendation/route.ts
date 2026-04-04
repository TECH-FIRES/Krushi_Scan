import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cropName, area, expectedYield, location } = body

    // Mock API Processing Delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Fallback default yield if not provided (e.g., 2 tons per acre)
    const yieldAmount = expectedYield ? parseFloat(expectedYield) : (parseFloat(area) * 2)

    // Mock Market Data Generation based on crop
    const basePrice = cropName.toLowerCase().includes('tomato') ? 15000 : 
                      cropName.toLowerCase().includes('wheat') ? 22000 : 25000;

    // Mock AI distance adjustments based on user location (demo purposes)
    const baseDistanceModifier = location ? (location.length % 5) * 10 : 0;

    const markets = [
      {
        id: 1,
        name: "APMC Main City Market",
        distance: 45 + baseDistanceModifier, // km
        pricePerTon: basePrice + 3000,
        transportCostPerTon: 500,
      },
      {
        id: 2,
        name: "Local Village Mandi",
        distance: 5 + baseDistanceModifier,
        pricePerTon: basePrice - 1000,
        transportCostPerTon: 50,
      },
      {
        id: 3,
        name: "Regional Export Hub",
        distance: 120 + baseDistanceModifier,
        pricePerTon: basePrice + 6000,
        transportCostPerTon: 1200,
      }
    ].map(m => {
      const totalRevenue = yieldAmount * m.pricePerTon;
      const totalTransport = yieldAmount * m.transportCostPerTon;
      const netProfit = totalRevenue - totalTransport;
      return { ...m, totalRevenue, totalTransport, netProfit };
    });

    // Sort markets by Net Profit highest to lowest
    markets.sort((a, b) => b.netProfit - a.netProfit);
    const bestMarket = markets[0];
    
    // Find Nearest Market
    const nearestMarket = [...markets].sort((a, b) => a.distance - b.distance)[0];

    // Mock Price Trend Data (Historical + Future Predictions)
    const priceTrend = [
      { month: 'Jan', price: basePrice - 2000, type: 'Historical' },
      { month: 'Feb', price: basePrice - 1000, type: 'Historical' },
      { month: 'Mar', price: basePrice, type: 'Historical' },
      { month: 'Apr', price: basePrice + 500, type: 'Predicted' },
      { month: 'May', price: basePrice + 2500, type: 'Predicted' },
      { month: 'Jun', price: basePrice + 1500, type: 'Predicted' },
    ];

    // Final AI Recommendation string
    let actionRecommendation = `Sell at ${bestMarket.name} for maximum profit.`;
    if (priceTrend[4].price > bestMarket.pricePerTon + 1000) {
      actionRecommendation = `AI Suggests holding stock for 2 months. Prices are predicted to surge in ${priceTrend[4].month}.`;
    }

    return NextResponse.json({
      success: true,
      data: {
        crop: cropName,
        yieldCalculated: yieldAmount,
        bestMarket,
        nearestMarket,
        markets,
        priceTrend,
        recommendation: actionRecommendation
      }
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to process crop data' }, { status: 500 })
  }
}