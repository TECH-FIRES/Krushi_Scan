'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Leaf, CheckCircle, AlertTriangle, Loader, Sprout, Sun, Droplets, FlaskConical } from 'lucide-react'

interface PredictionResult {
  disease: string
  confidence: number
  treatment: string
  leafType?: string
  className?: string
  modelFile?: string
  modelUpdatedAt?: number
  topPredictions?: Array<{
    className: string
    confidence: number
  }>
  type?: string
  requirements?: {
    soil: string
    water: string
    sunlight: string
    fertilizer: string
    harvest: string
  }
}

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<'disease' | 'crop-identification'>('disease')
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    setSelectedFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)
    setPrediction(null)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/ai-predict', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze image')
      }

      if (result.success) {
        const data: PredictionResult = {
          disease: result.disease || result.prediction,
          confidence: result.confidence || 0,
          treatment: result.treatment || 'No treatment information available',
        }

        setPrediction(data)
      } else {
        throw new Error('AI prediction failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = () => {
    if (!prediction) return

    const reportData = {
      timestamp: new Date().toISOString(),
      scanType: activeTab,
      disease: prediction.disease,
      confidence: prediction.confidence,
      treatment: prediction.treatment,
      prediction: prediction.className,
      crop: prediction.leafType,
      top5_predictions: prediction.topPredictions,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `krushi-scan-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveReport = async () => {
    if (!prediction) return

    try {
      const response = await fetch('/api/scan-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disease: prediction.disease,
          confidence: prediction.confidence,
          treatment: prediction.treatment,
          prediction: prediction.className,
          crop: prediction.leafType,
          imageUrl: preview,
          scanType: activeTab,
          top5_predictions: prediction.topPredictions,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert('✅ Report saved to database!')
        handleDownloadReport()
      } else {
        throw new Error(result.error || 'Failed to save report')
      }
    } catch (err) {
      alert('❌ Failed to save report: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreview(null)
    setPrediction(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-nature-sage p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-nature-forest mb-2">AI Scanner</h1>
        <p className="text-gray-600">Scan plants, leaves or seeds to identify diseases and get crop growing guides</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab('disease');
            handleReset();
          }}
          className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'disease' 
              ? 'bg-nature-forest text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={18} /> Disease Detection
          </div>
        </button>
        <button
          onClick={() => {
            setActiveTab('crop-identification');
            handleReset();
          }}
          className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'crop-identification' 
              ? 'bg-nature-leaf text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Sprout size={18} /> Crop & Seed ID
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 flex flex-col"
        >
          <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center gap-2">
            {activeTab === 'disease' ? (
              <><Leaf className="text-nature-leaf" /> Upload Leaf Image</>
            ) : (
              <><Sprout className="text-nature-leaf" /> Upload Seed/Plant Image</>
            )}
          </h2>

          {!preview ? (
            <motion.div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
              className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-all ${
                dragActive
                  ? 'border-nature-forest bg-nature-forest/5'
                  : 'border-gray-300 hover:border-nature-forest hover:bg-nature-forest/5'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="text-nature-forest mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop your image here</h3>
              <p className="text-gray-600 text-center mb-4">or click to browse</p>
              <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP (up to 10MB)</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative rounded-xl overflow-hidden mb-4"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            aria-label="Upload image"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-300 rounded-lg p-3 mb-4 text-red-700 text-sm flex items-center gap-2"
            >
              <AlertTriangle size={16} />
              {error}
            </motion.div>
          )}

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-6 py-3 rounded-xl bg-white border border-nature-forest text-nature-forest font-semibold hover:bg-nature-forest/5 transition"
            >
              {preview ? 'Change Image' : 'Select Image'}
            </motion.button>

            {preview && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                >
                  Clear
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-forest text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="inline mr-2 animate-spin" size={18} />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze'
                  )}
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-8"
        >
          <AnimatePresence mode="wait">
            {!prediction && !loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600">
                  {activeTab === 'disease' 
                    ? 'Upload and analyze a leaf image to see results' 
                    : 'Upload a seed or plant image to get full growing details'}
                </p>
              </motion.div>
            ) : loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-card p-8 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="mx-auto mb-4"
                >
                  <Loader size={48} className="text-nature-forest mx-auto" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Image...</h3>
                <p className="text-gray-600">
                  {activeTab === 'disease' 
                    ? 'Our AI is examining the leaf for diseases' 
                    : 'Our AI is identifying the crop and generating growing guides'}
                </p>
              </motion.div>
            ) : prediction ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="text-green-500" size={32} />
                  <h3 className="text-2xl font-bold text-gray-900">Analysis Complete</h3>
                </div>

                <div className="space-y-6">
                  {/* Results Display */}
                  <div className={`rounded-xl p-4 ${activeTab === 'disease' ? 'bg-gradient-to-br from-nature-forest/10 to-nature-leaf/10' : 'bg-gradient-to-br from-nature-leaf/10 to-emerald-100/50'}`}>
                    <p className="text-sm text-gray-600 mb-1">
                      {activeTab === 'disease' ? 'Disease Detected' : 'Crop Identified'}
                    </p>
                    <h4 className="text-2xl font-bold text-nature-forest mb-2">
                      {prediction.disease}
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`${activeTab === 'disease' ? 'bg-gradient-forest' : 'bg-emerald-500'} h-2 rounded-full`}
                      />
                    </div>
                    <p className="text-sm font-semibold text-nature-forest mt-2">
                      {prediction.confidence}% Confidence
                    </p>
                    {prediction.modelFile ? (
                      <p className="text-xs text-gray-600 mt-2">
                        Model: {prediction.modelFile}
                        {prediction.modelUpdatedAt ? ` | Updated: ${new Date(prediction.modelUpdatedAt * 1000).toLocaleString()}` : ''}
                      </p>
                    ) : null}
                    {prediction.className ? (
                      <p className="text-xs text-gray-600 mt-1">Raw class: {prediction.className}</p>
                    ) : null}
                  </div>

                  {prediction.topPredictions && prediction.topPredictions.length > 0 ? (
                    <div className="bg-white/60 rounded-xl p-3 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Top Predictions</p>
                      <div className="space-y-1">
                        {prediction.topPredictions.map((item) => (
                          <div key={item.className} className="flex items-center justify-between text-xs text-gray-700">
                            <span>{item.className}</span>
                            <span>{item.confidence}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {activeTab === 'disease' ? (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                      {prediction.leafType ? (
                        <>
                          <p className="text-sm text-gray-600 mb-1 font-semibold">Leaf Type</p>
                          <p className="text-gray-900 mb-3">{prediction.leafType}</p>
                        </>
                      ) : null}
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Recommended Treatment</p>
                      <p className="text-gray-900">{prediction.treatment}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-2 font-semibold flex items-center gap-2"><Leaf size={16} /> Overview</p>
                        <p className="text-gray-900">{prediction.treatment}</p>
                      </div>
                      
                      {prediction.requirements && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="glass-card p-3 border border-amber-100 flex flex-col gap-1">
                            <span className="text-amber-700 font-semibold text-xs flex items-center gap-1"><Sun size={14}/> Sunlight</span>
                            <span className="text-sm text-gray-800">{prediction.requirements.sunlight}</span>
                          </div>
                          <div className="glass-card p-3 border border-blue-100 flex flex-col gap-1">
                            <span className="text-blue-700 font-semibold text-xs flex items-center gap-1"><Droplets size={14}/> Water</span>
                            <span className="text-sm text-gray-800">{prediction.requirements.water}</span>
                          </div>
                          <div className="glass-card p-3 border border-orange-100 flex flex-col gap-1">
                            <span className="text-orange-700 font-semibold text-xs flex items-center gap-1"><Leaf size={14}/> Soil</span>
                            <span className="text-sm text-gray-800">{prediction.requirements.soil}</span>
                          </div>
                          <div className="glass-card p-3 border border-purple-100 flex flex-col gap-1">
                            <span className="text-purple-700 font-semibold text-xs flex items-center gap-1"><FlaskConical size={14}/> Fertilizer</span>
                            <span className="text-sm text-gray-800">{prediction.requirements.fertilizer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="px-4 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                    >
                      Analyze Another
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveReport}
                      className="px-4 py-3 rounded-xl bg-gradient-forest text-white font-semibold hover:shadow-lg transition"
                    >
                      Save Report
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
