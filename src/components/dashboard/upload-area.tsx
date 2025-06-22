"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { Upload, X, FileImage } from "lucide-react"

interface UploadedFile {
  file: File
  preview?: string
}

interface UploadAreaProps {
  onFilesAdded?: (files: File[]) => void
}

export default function UploadArea({ onFilesAdded }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

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

  const addFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const preview = URL.createObjectURL(file)
      return { file, preview }
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])

    if (onFilesAdded) {
      onFilesAdded(files)
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
      {/* Upload Zone */}
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

      {/* Uploaded Files Preview */}
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
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-gray-500">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
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
