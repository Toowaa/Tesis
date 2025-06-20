"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Upload, Camera, Smartphone, Video } from "lucide-react"

interface UploadMenuProps {
  onFilesSelected?: (files: FileList) => void
}

export default function UploadMenu({ onFilesSelected }: UploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const frontCameraInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  
  const [showCameraOptions, setShowCameraOptions] = useState(false)

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraCapture = (cameraType: 'environment' | 'user' = 'environment') => {
    if (cameraType === 'environment') {
      cameraInputRef.current?.click()
    } else {
      frontCameraInputRef.current?.click()
    }
  }

  const handleVideoCapture = () => {
    videoInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFilesSelected) {
      onFilesSelected(files)
    }
    // Reset input para permitir seleccionar el mismo archivo nuevamente
    e.target.value = ''
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <Card className="w-64 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          {/* Main Upload Actions */}
          <div className="space-y-2">
            <Button
              onClick={handleFileUpload}
              className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Upload className="w-5 h-5 mr-3" />
              Subir desde dispositivo
            </Button>

            <Button
              onClick={() => setShowCameraOptions(!showCameraOptions)}
              variant="outline"
              className="w-full justify-start h-12 border-blue-200 hover:bg-blue-50"
            >
              <Camera className="w-5 h-5 mr-3" />
              Tomar foto
            </Button>

            {/* Opciones de Cámara */}
            {showCameraOptions && (
              <div className="ml-4 space-y-1 animate-in slide-in-from-top-2">
                <Button
                  onClick={() => handleCameraCapture('environment')}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 text-sm"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Cámara trasera
                </Button>
                <Button
                  onClick={() => handleCameraCapture('user')}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 text-sm"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Cámara frontal
                </Button>
                <Button
                  onClick={handleVideoCapture}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 text-sm"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Grabar video
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Info */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700 text-center">
              Selecciona archivos desde tu dispositivo o toma una foto directamente
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>Espacio usado</span>
              <span>2.4 GB / 10 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "24%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden file inputs */}
      <input 
        ref={fileInputRef} 
        type="file" 
        multiple 
        accept="image/*,video/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Cámara trasera (ambiente) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Cámara frontal (usuario) */}
      <input
        ref={frontCameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Video */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}