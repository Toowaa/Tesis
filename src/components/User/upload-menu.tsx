"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Upload, Camera } from "lucide-react"

interface UploadMenuProps {
  onFilesSelected?: (files: FileList) => void
}

export default function UploadMenu({ onFilesSelected }: UploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraCapture = () => {
    cameraInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFilesSelected) {
      onFilesSelected(files)
    }
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
              onClick={handleCameraCapture}
              variant="outline"
              className="w-full justify-start h-12 border-blue-200 hover:bg-blue-50"
            >
              <Camera className="w-5 h-5 mr-3" />
              Tomar foto
            </Button>
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
      <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
