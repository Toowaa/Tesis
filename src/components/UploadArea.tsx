

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { Upload, X, FileImage } from "lucide-react"

export default function UploadArea() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles] = useState([
    { name: "vacation-photo-1.jpg", size: 2.4 },
    { name: "family-dinner.png", size: 1.8 },
    { name: "sunset-beach.jpg", size: 3.2 },
    { name: "birthday-party.jpg", size: 2.1 },
    { name: "mountain-hike.png", size: 4.5 },
    { name: "city-lights.jpg", size: 1.9 },
  ])

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
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Upload Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Archivos subidos ({uploadedFiles.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="relative group overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <FileImage className="w-12 h-12 text-blue-500" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} MB</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index % 2 === 0 ? "JPG" : "PNG"}
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
