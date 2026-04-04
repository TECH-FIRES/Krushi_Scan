import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  // Create a readable stream for server-sent events
  const encoder = new TextEncoder()

  const customReadable = new ReadableStream({
    start(controller) {
      let count = 0

      const sendData = () => {
        if (count >= 10) {
          controller.close()
          return
        }

        const sensorData = {
          timestamp: new Date().toISOString(),
          nodeId: 'ESP32-001',
          sensors: {
            temperature: 25 + Math.random() * 10,
            humidity: 50 + Math.random() * 30,
            soilMoisture: 40 + Math.random() * 40,
            ph: 6 + Math.random() * 2,
            nitrogen: 100 + Math.random() * 50,
            phosphorus: 30 + Math.random() * 30,
            potassium: 150 + Math.random() * 80,
          },
        }

        const data = `data: ${JSON.stringify(sensorData)}\n\n`
        controller.enqueue(encoder.encode(data))

        count++
        setTimeout(sendData, 1000) // Send data every second
      }

      sendData()
    },
  })

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
