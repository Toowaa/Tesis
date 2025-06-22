"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { Upload, X, FileImage, Loader2, AlertCircle } from "lucide-react"

interface UploadedFile {
  file: File
  preview?: string
  prediction?: {
    className: string
    probability: number
  }
  isProcessing?: boolean
}

interface UploadAreaProps {
  onFilesAdded?: (files: File[]) => void
}

export default function UploadArea({ onFilesAdded }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [model, setModel] = useState<any>(null)
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  // URL del modelo de Teachable Machine
  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/uQWGpZttU/"

  // Cargar modelo de Teachable Machine
  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelStatus('loading')
        
        // Cargar múltiples scripts necesarios
        const scripts = [
          'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js',
          'https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js'
        ]
        
        for (const src of scripts) {
          if (!document.querySelector(`script[src="${src}"]`)) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script')
              script.src = src
              script.async = true
              script.onload = resolve
              script.onerror = reject
              document.head.appendChild(script)
            })
          }
        }
        
        // Esperar a que las librerías se inicialicen
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Verificar que todo esté disponible
        if (!(window as any).tmImage) {
          throw new Error('Teachable Machine no está disponible')
        }
        
        console.log('Cargando modelo...')
        const modelURL = MODEL_URL + "model.json"
        const metadataURL = MODEL_URL + "metadata.json"
        
        const loadedModel = await (window as any).tmImage.load(modelURL, metadataURL)
        setModel(loadedModel)
        setModelStatus('ready')
        console.log('✅ Modelo cargado exitosamente')
        
      } catch (err) {
        setModelStatus('error')
        console.error('❌ Error cargando modelo:', err)
      }
    }

    loadModel()
  }, [])

  // Función para predecir imagen
  const predictImage = async (imageElement: HTMLImageElement): Promise<{ className: string; probability: number } | null> => {
    if (!model || !(window as any).tmImage) {
      console.log('Modelo o tmImage no disponible')
      return null
    }

    try {
      console.log('Iniciando predicción...')
      const prediction = await model.predict(imageElement)
      console.log('Predicción recibida:', prediction)
      
      // Encontrar la predicción con mayor probabilidad
      const bestPrediction = prediction.reduce((prev: any, current: any) => 
        (prev.probability > current.probability) ? prev : current
      )
      
      console.log('Mejor predicción:', bestPrediction)
      
      return {
        className: bestPrediction.className,
        probability: bestPrediction.probability
      }
    } catch (err) {
      console.error('Error en predicción:', err)
      return null
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    addFiles(files)
  }

  const addFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const preview = URL.createObjectURL(file)
      return { file, preview, isProcessing: true }
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])

    if (onFilesAdded) {
      onFilesAdded(files)
    }

    // Procesar cada archivo para clasificación
    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = uploadedFiles.length + i
      
      if (model && newFiles[i].preview) {
        const img = new Image()
        img.onload = async () => {
          const prediction = await predictImage(img)
          
          setUploadedFiles(prev => 
            prev.map((file, idx) => 
              idx === fileIndex 
                ? { ...file, prediction: prediction ?? undefined, isProcessing: false }
                : file
            )
          )
        }
        img.src = newFiles[i].preview!
      } else {
        // Si no hay modelo, quitar el estado de procesamiento
        setUploadedFiles(prev => 
          prev.map((file, idx) => 
            idx === fileIndex 
              ? { ...file, isProcessing: false }
              : file
          )
        )
      }
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev[index]
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleFileSelect = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "image/*"
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      addFiles(files)
    }
    input.click()
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Estado del modelo - Card pequeña y elegante */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Clasificador de Imágenes</h3>
            <p className="text-sm text-gray-600">Powered by Teachable Machine</p>
          </div>
          <div className="flex items-center space-x-2">
            {modelStatus === 'ready' ? (
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Listo</span>
              </div>
            ) : modelStatus === 'error' ? (
              <div className="flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">Error</span>
              </div>
            ) : (
              <div className="flex items-center text-blue-600">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span className="text-sm">Cargando...</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Upload Zone - Tu diseño original */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
      >
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Arrastra y suelta tus fotos aquí</h3>
          <p className="text-gray-600 mb-4">O haz clic para seleccionar archivos desde tu dispositivo</p>
          <Button variant="outline" className="mx-auto">
            <Upload className="w-4 h-4 mr-2" />
            Seleccionar archivos
          </Button>
        </div>
      </Card>

      {/* Uploaded Files Preview - Tu diseño original + clasificación */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Archivos subidos ({uploadedFiles.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <Card key={index} className="relative group overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview || "/placeholder.svg"}
                      alt={uploadedFile.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileImage className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Información del archivo */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-gray-500">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  {/* Resultado de clasificación - NUEVA SECCIÓN */}
                  <div className="mt-2">
                    {uploadedFile.isProcessing ? (
                      <div className="flex items-center space-x-2 bg-yellow-50 rounded-lg p-2">
                        <Loader2 className="w-3 h-3 animate-spin text-yellow-600" />
                        <span className="text-xs text-yellow-700">Clasificando...</span>
                      </div>
                    ) : uploadedFile.prediction ? (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-green-800">Resultado:</span>
                          <span className="text-xs text-green-600 font-bold">
                            {(uploadedFile.prediction.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm font-bold text-green-900 truncate">
                          {uploadedFile.prediction.className}
                        </p>
                      </div>
                    ) : modelStatus === 'ready' ? (
                      <div className="bg-gray-50 rounded-lg p-2">
                        <span className="text-xs text-gray-600">Sin clasificar</span>
                      </div>
                    ) : (
                      <div className="bg-blue-50 rounded-lg p-2">
                        <span className="text-xs text-blue-600">Esperando modelo...</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Botón eliminar - Tu diseño original */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                {/* Badge tipo archivo - Tu diseño original */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {uploadedFile.file.type.split("/")[1].toUpperCase()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}