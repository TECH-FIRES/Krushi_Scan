import { NextRequest, NextResponse } from 'next/server'

interface WeatherResponse {
  region: string
  temperature: number
  humidity: number
  windSpeed: number
  rainfall: number
  condition: string
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
  }>
}

const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy']

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get('state') || 'Unknown'
    const district = searchParams.get('district') || 'Unknown'

    // Mock weather data based on region
    const weatherData: WeatherResponse = {
      region: `${district}, ${state}`,
      temperature: 25 + Math.random() * 10,
      humidity: 50 + Math.random() * 30,
      windSpeed: 5 + Math.random() * 15,
      rainfall: Math.random() * 100,
      condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      forecast: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        high: 25 + Math.random() * 10,
        low: 18 + Math.random() * 8,
        condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      })),
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
