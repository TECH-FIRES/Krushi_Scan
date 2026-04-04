import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getSensorData() {
    const response = await this.client.get('/api/sensor-data')
    return response.data
  }

  async getHardwareData(limit: number = 20, deviceId?: string) {
    const params = new URLSearchParams()
    params.append('limit', limit.toString())
    if (deviceId) params.append('device_id', deviceId)
    
    const response = await this.client.get(`/api/hardware/ingest?${params.toString()}`)
    return response.data
  }

  async predictDisease(formData: FormData) {
    const response = await this.client.post('/api/ai-predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async getAlerts(limit: number = 10) {
    const response = await this.client.get(`/api/alerts?limit=${limit}`)
    return response.data
  }

  async getWeather(state: string, district: string) {
    const response = await this.client.get(`/api/weather?state=${state}&district=${district}`)
    return response.data
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/api/auth/login', { email, password })
    return response.data
  }

  async register(name: string, email: string, password: string) {
    const response = await this.client.post('/api/auth/register', { name, email, password })
    return response.data
  }
}

export const apiClient = new ApiClient()
