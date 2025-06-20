"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Upload, Camera, Smartphone, Video, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadMenuProps {
  onFilesSelected?: (files: FileList) => void
}

export default function UploadMenu({ onFilesSelected }: UploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const frontCameraInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCameraOptions, setShowCameraOptions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isExpanded && !target.closest('[data-upload-menu]')) {
        setIsExpanded(false)
        setShowCameraOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraCapture = (cameraType: 'environment' | 'user' = 'environment') => {
    if (cameraType === 'environment') {
      cameraInputRef.current?.click()
    } else {
      frontCameraInputRef.current?.click()
    }
    // Cerrar menú después de seleccionar
    setTimeout(() => {
      setIsExpanded(false)
      setShowCameraOptions(false)
    }, 100)
  }

  const handleVideoCapture = () => {
    videoInputRef.current?.click()
    setTimeout(() => {
      setIsExpanded(false)
      setShowCameraOptions(false)
    }, 100)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onFilesSelected) {
      onFilesSelected(files)
    }
    e.target.value = ''
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setShowCameraOptions(false)
    }
  }

  return (
    <>
      {/* Overlay para móvil */}
      {isExpanded && isMobile && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in-0 duration-200" />
      )}

      <div 
        data-upload-menu
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          isExpanded 
            ? isMobile 
              ? "bottom-4 left-4 right-4" 
              : "right-6 top-1/2 -translate-y-1/2"
            : "bottom-6 right-6"
        )}
      >
        {/* Botón flotante pequeño */}
        {!isExpanded && (
          <Button
            onClick={toggleExpanded}
            className={cn(
              "h-14 w-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 text-white",
              "transform hover:scale-105 transition-all duration-200",
              "animate-in zoom-in-50 duration-300"
            )}
          >
            <Plus className="w-6 h-6" />
          </Button>
        )}

        {/* Menú expandido */}
        {isExpanded && (
          <Card 
            className={cn(
              "shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden",
              "animate-in zoom-in-95 slide-in-from-bottom-5 duration-300",
              isMobile ? "w-full" : "w-72"
            )}
          >
            <CardContent className="p-4 space-y-3">
              {/* Header con botón cerrar */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Subir contenido</h3>
                <Button
                  onClick={toggleExpanded}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Main Upload Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleFileUpload}
                  className={cn(
                    "w-full justify-start bg-blue-600 hover:bg-blue-700 text-white",
                    "transform hover:scale-[1.02] transition-all duration-150",
                    isMobile ? "h-14 text-base" : "h-12"
                  )}
                >
                  <Upload className={cn("mr-3", isMobile ? "w-6 h-6" : "w-5 h-5")} />
                  Subir desde dispositivo
                </Button>

                <Button
                  onClick={() => setShowCameraOptions(!showCameraOptions)}
                  variant="outline"
                  className={cn(
                    "w-full justify-start border-blue-200 hover:bg-blue-50",
                    "transform hover:scale-[1.02] transition-all duration-150",
                    isMobile ? "h-14 text-base" : "h-12"
                  )}
                >
                  <Camera className={cn("mr-3", isMobile ? "w-6 h-6" : "w-5 h-5")} />
                  Tomar foto o video
                </Button>

                {/* Opciones de Cámara */}
                {showCameraOptions && (
                  <div className={cn(
                    "ml-4 space-y-1 overflow-hidden",
                    "animate-in slide-in-from-top-2 duration-200"
                  )}>
                    <Button
                      onClick={() => handleCameraCapture('environment')}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm hover:bg-blue-50",
                        "transform hover:translate-x-1 transition-all duration-150",
                        isMobile ? "h-12 text-base" : "h-10"
                      )}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Cámara trasera
                    </Button>
                    <Button
                      onClick={() => handleCameraCapture('user')}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm hover:bg-blue-50",
                        "transform hover:translate-x-1 transition-all duration-150",
                        isMobile ? "h-12 text-base" : "h-10"
                      )}
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Cámara frontal
                    </Button>
                    <Button
                      onClick={handleVideoCapture}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm hover:bg-blue-50",
                        "transform hover:translate-x-1 transition-all duration-150",
                        isMobile ? "h-12 text-base" : "h-10"
                      )}
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
                <p className={cn(
                  "text-blue-700 text-center",
                  isMobile ? "text-sm" : "text-xs"
                )}>
                  {isMobile 
                    ? "Selecciona archivos o usa la cámara" 
                    : "Selecciona archivos desde tu dispositivo o toma una foto directamente"
                  }
                </p>
              </div>

           
            </CardContent>
          </Card>
        )}
      </div>

      {/* Hidden file inputs */}
      <input 
        ref={fileInputRef} 
        type="file" 
        multiple 
        accept="image/*,video/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        ref={frontCameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  )
}