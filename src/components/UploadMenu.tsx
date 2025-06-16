"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Upload, Camera, FolderOpen, Settings, Download, Share2, MoreVertical, Smartphone, Monitor } from "lucide-react"

export default function UploadMenu() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <Card className="w-64 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          {/* Main Upload Actions */}
          <div className="space-y-2">
            <Button className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700 text-white">
              <Upload className="w-5 h-5 mr-3" />
              Subir desde dispositivo
            </Button>

            <Button variant="outline" className="w-full justify-start h-12 border-blue-200 hover:bg-blue-50">
              <Camera className="w-5 h-5 mr-3" />
              Tomar foto
            </Button>
          </div>

          <Separator />

          {/* Device Options */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2">Desde dispositivo</p>
            <Button variant="ghost" className="w-full justify-start h-10">
              <Smartphone className="w-4 h-4 mr-3" />
              Galería del teléfono
            </Button>

            <Button variant="ghost" className="w-full justify-start h-10">
              <Monitor className="w-4 h-4 mr-3" />
              Escritorio
            </Button>

            <Button variant="ghost" className="w-full justify-start h-10">
              <FolderOpen className="w-4 h-4 mr-3" />
              Carpeta específica
            </Button>
          </div>

          <Separator />

          {/* Additional Options */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2">Otras fuentes</p>
            <Button variant="ghost" className="w-full justify-start h-10">
              <Download className="w-4 h-4 mr-3" />
              Desde URL
            </Button>

            <Button variant="ghost" className="w-full justify-start h-10">
              <Share2 className="w-4 h-4 mr-3" />
              Redes sociales
            </Button>
          </div>

          <Separator />

          {/* Settings */}
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-10">
              <Settings className="w-4 h-4 mr-3" />
              Configuración
            </Button>

            <Button variant="ghost" className="w-full justify-start h-10" onClick={() => setIsExpanded(!isExpanded)}>
              <MoreVertical className="w-4 h-4 mr-3" />
              Más opciones
            </Button>
          </div>

          {/* Expanded Options */}
          {isExpanded && (
            <div className="space-y-1 pt-2 border-t border-gray-100">
              <div className="px-2 mb-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Opciones avanzadas</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                ✨ Redimensionar automáticamente
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                🗜️ Comprimir imágenes
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                🏷️ Agregar marca de agua
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                📁 Organizar por fecha
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-gray-50 rounded-lg p-3 mt-4">
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
    </div>
  )
}
