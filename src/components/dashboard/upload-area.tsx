"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  Upload,
  X,
  FileImage,
  Loader2,
  AlertCircle,
  DollarSign,

  Recycle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UploadedFile {
  file: File;
  preview?: string;
  prediction?: {
    className: string;
    probability: number;
    estimatedPrice?: number;
    recyclingValue?: number;
  };
  isProcessing?: boolean;
}

interface UploadAreaProps {
  onFilesAdded?: (files: File[]) => void;
  user?: any;
}

// Base de datos de precios para las categorías de tu modelo (Precios en Soles Peruanos)
const PRICE_DATABASE: Record<
  string,
  {
    basePrice: number; // Precio base en soles peruanos
    variationRange: number; // Rango de variación
    currency: string;
    recyclingValue: number; // Valor de reciclaje
    description: string;
  }
> = {
  "Botella plástica": {
    basePrice: 2.0,
    variationRange: 1.5, // S/0.5 - S/3.5
    currency: "PEN",
    recyclingValue: 0.2,
    description: "Botella de plástico reutilizable",
  },
  Lata: {
    basePrice: 1.5,
    variationRange: 1.0, // S/0.5 - S/2.5
    currency: "PEN",
    recyclingValue: 0.3,
    description: "Lata de aluminio o acero",
  },
  Cartón: {
    basePrice: 0.5,
    variationRange: 0.8, // S/0.1 - S/1.3
    currency: "PEN",
    recyclingValue: 0.05,
    description: "Material de cartón",
  },
  Libro: {
    basePrice: 15,
    variationRange: 25, // S/5 - S/40 (libros usados en Perú)
    currency: "PEN",
    recyclingValue: 0.5,
    description: "Libro usado",
  },
  Papel: {
    basePrice: 0.3,
    variationRange: 0.4, // S/0.1 - S/0.7
    currency: "PEN",
    recyclingValue: 0.02,
    description: "Papel reciclable",
  },
  "Botella de vidrio": {
    basePrice: 3,
    variationRange: 4, // S/1 - S/7
    currency: "PEN",
    recyclingValue: 0.25,
    description: "Botella de vidrio reutilizable",
  },
  Reloj: {
    basePrice: 25, // Precio base realista para reloj usado en Perú
    variationRange: 35, // S/10 - S/60 (reloj común usado)
    currency: "PEN",
    recyclingValue: 3.0,
    description: "Reloj usado",
  },
  Tetrapak: {
    basePrice: 1.2,
    variationRange: 1.3, // S/0.5 - S/2.5
    currency: "PEN",
    recyclingValue: 0.08,
    description: "Envase Tetra Pak",
  },
  Plásticos: {
    basePrice: 2.5,
    variationRange: 3.5, // S/1 - S/6
    currency: "PEN",
    recyclingValue: 0.15,
    description: "Diversos plásticos",
  },
};

export default function UploadArea({ onFilesAdded,user }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [model, setModel] = useState<any>(null);
  const [modelStatus, setModelStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  // URL del modelo de Teachable Machine
  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/uQWGpZttU/";

  // Función para estimar precio basado en la clasificación
  const estimatePrice = (
    className: string,
    probability: number
  ): { price: number; recyclingValue: number } => {
    const itemData = PRICE_DATABASE[className] || {
      basePrice: 2,
      variationRange: 3,
      currency: "PEN",
      recyclingValue: 0.02,
      description: "Artículo no identificado",
    };

    // Nueva lógica más realista:
    const { basePrice, variationRange, recyclingValue } = itemData;

    // 1. Usar la confianza para ajustar hacia arriba o abajo del precio base
    const confidenceAdjustment = (probability - 0.5) * 0.3; // -15% a +15% basado en confianza

    // 2. Agregar variación aleatoria más controlada
    const randomVariation = (Math.random() - 0.5) * 0.4; // -20% a +20%

    // 3. Calcular precio final
    const adjustmentFactor = 1 + confidenceAdjustment + randomVariation;
    let finalPrice = basePrice * adjustmentFactor;

    // 4. Asegurar que esté dentro del rango razonable
    const minPrice = Math.max(0.1, basePrice - variationRange);
    const maxPrice = basePrice + variationRange;
    finalPrice = Math.max(minPrice, Math.min(maxPrice, finalPrice));

    return {
      price: Math.round(finalPrice * 100) / 100, // Redondear a 2 decimales
      recyclingValue: Math.round(recyclingValue * 100) / 100,
    };
  };

  // Cargar modelo de Teachable Machine
  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelStatus("loading");

        const scripts = [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js",
          "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js",
        ];

        for (const src of scripts) {
          if (!document.querySelector(`script[src="${src}"]`)) {
            await new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.src = src;
              script.async = true;
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!(window as any).tmImage) {
          throw new Error("Teachable Machine no está disponible");
        }

        console.log("Cargando modelo...");
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        const loadedModel = await (window as any).tmImage.load(
          modelURL,
          metadataURL
        );
        setModel(loadedModel);
        setModelStatus("ready");
        console.log("✅ Modelo cargado exitosamente");
      } catch (err) {
        setModelStatus("error");
        console.error("❌ Error cargando modelo:", err);
      }
    };

    loadModel();
  }, []);

  // Función para predecir imagen
  const predictImage = async (
    imageElement: HTMLImageElement
  ): Promise<{
    className: string;
    probability: number;
    estimatedPrice: number;
    recyclingValue: number;
  } | null> => {
    if (!model || !(window as any).tmImage) {
      console.log("Modelo o tmImage no disponible");
      return null;
    }

    try {
      console.log("Iniciando predicción...");
      const prediction = await model.predict(imageElement);
      console.log("Predicción recibida:", prediction);

      const bestPrediction = prediction.reduce((prev: any, current: any) =>
        prev.probability > current.probability ? prev : current
      );

      console.log("Mejor predicción:", bestPrediction);

      const { price, recyclingValue } = estimatePrice(
        bestPrediction.className,
        bestPrediction.probability
      );

      return {
        className: bestPrediction.className,
        probability: bestPrediction.probability,
        estimatedPrice: price,
        recyclingValue: recyclingValue,
      };
    } catch (err) {
      console.error("Error en predicción:", err);
      return null;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    addFiles(files);
  };

  const addFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const preview = URL.createObjectURL(file);
      return { file, preview, isProcessing: true };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    if (onFilesAdded) {
      onFilesAdded(files);
    }

    // Procesar cada archivo para clasificación
    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = uploadedFiles.length + i;

      if (model && newFiles[i].preview) {
        const img = new Image();
        img.onload = async () => {
          const prediction = await predictImage(img);

          setUploadedFiles((prev) =>
            prev.map((file, idx) =>
              idx === fileIndex
                ? {
                    ...file,
                    prediction: prediction
                      ? {
                          className: prediction.className,
                          probability: prediction.probability,
                          estimatedPrice: prediction.estimatedPrice,
                          recyclingValue: prediction.recyclingValue,
                        }
                      : undefined,
                    isProcessing: false,
                  }
                : file
            )
          );
        };
        img.src = newFiles[i].preview!;
      } else {
        setUploadedFiles((prev) =>
          prev.map((file, idx) =>
            idx === fileIndex ? { ...file, isProcessing: false } : file
          )
        );
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev[index];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      addFiles(files);
    };
    input.click();
  };

  // Calcular estadísticas totales
  const totalEstimatedValue = uploadedFiles.reduce(
    (sum, file) => sum + (file.prediction?.estimatedPrice || 0),
    0
  );

  const totalRecyclingValue = uploadedFiles.reduce(
    (sum, file) => sum + (file.prediction?.recyclingValue || 0),
    0
  );

  const SendToSupabase = async () => {
    try {
    
      if(!user?.id) {
        console.error("No hay sesión activa o el usuario no está autenticado");
        return;
      }

     

      const dataToSend = uploadedFiles
        .filter((file) => file.prediction)
        .map((file) => ({
          user_id: user?.id,
          nombre: file.prediction!.className,
          precio: file.prediction!.estimatedPrice,
          imagen_url: file.preview,
        }));

      if (dataToSend.length === 0) {
        console.warn("No hay archivos procesados para enviar.");
        return;
      }

      const { data, error } = await supabase
        .from("productos")
        .upsert(dataToSend)
        .select("user_id, nombre, precio, imagen_url");

      if (error) {
        console.error("Error al enviar a Supabase:", error);
      } else {
        console.log("Datos enviados a Supabase:", data);
      }
    } catch (error) {
      console.error("Error al enviar a Supabase:", error);
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Estado del modelo */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              Clasificador de Objetos & Estimador de Precios
            </h3>
            <p className="text-sm text-gray-600">
              Identifica objetos y estima su valor de reventa y reciclaje
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {modelStatus === "ready" ? (
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Listo</span>
              </div>
            ) : modelStatus === "error" ? (
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

      {/* Resumen de valores */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor estimado total</p>
                <p className="text-xl font-bold text-blue-900">
                  S/.{totalEstimatedValue.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Recycle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor de reciclaje</p>
                <p className="text-xl font-bold text-green-900">
                  S/.{totalRecyclingValue.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Upload Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Arrastra y suelta tus fotos aquí
          </h3>
          <p className="text-gray-600 mb-4">
            Sube imágenes de objetos para identificarlos y conocer su valor
          </p>
          <Button variant="outline" className="mx-auto">
            <Upload className="w-4 h-4 mr-2" />
            Seleccionar archivos
          </Button>
        </div>
      </Card>

      <Button
        variant="outline"
        className="mx-auto"
        onClick={(e) => {
          e.stopPropagation(); // 👈 detiene la burbuja del clic
          SendToSupabase(); // 👈 ahora sí se ejecuta
        }}
      >
        <Upload className="w-4 h-4 mr-2 items-center justify-center" />
        Enviar a Supabase
      </Button>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Objetos analizados ({uploadedFiles.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <Card
                key={index}
                className="relative group overflow-hidden hover:shadow-lg transition-all duration-200"
              >
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
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  {/* Resultado de clasificación y precios */}
                  <div className="space-y-2">
                    {uploadedFile.isProcessing ? (
                      <div className="flex items-center space-x-2 bg-yellow-50 rounded-lg p-3">
                        <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
                        <span className="text-sm text-yellow-700">
                          Analizando objeto...
                        </span>
                      </div>
                    ) : uploadedFile.prediction ? (
                      <div className="space-y-2">
                        {/* Clasificación */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-blue-800">
                              Objeto identificado:
                            </span>
                            <span className="text-xs text-blue-600 font-bold">
                              {(
                                uploadedFile.prediction.probability * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <p className="text-sm font-bold text-blue-900">
                            {uploadedFile.prediction.className}
                          </p>
                        </div>

                        {/* Precios */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                            <div className="flex items-center space-x-1 mb-1">
                              <DollarSign className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-700">
                                Reventa
                              </span>
                            </div>
                            <p className="text-sm font-bold text-green-900">
                              S/.
                              {uploadedFile.prediction.estimatedPrice?.toFixed(
                                2
                              )}
                            </p>
                          </div>

                          <div className="bg-teal-50 rounded-lg p-2 border border-teal-200">
                            <div className="flex items-center space-x-1 mb-1">
                              <Recycle className="w-3 h-3 text-teal-600" />
                              <span className="text-xs text-teal-700">
                                Reciclaje
                              </span>
                            </div>
                            <p className="text-sm font-bold text-teal-900">
                              S/.
                              {uploadedFile.prediction.recyclingValue?.toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : modelStatus === "ready" ? (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="text-sm text-gray-600">
                          Sin analizar
                        </span>
                      </div>
                    ) : (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <span className="text-sm text-blue-600">
                          Esperando modelo...
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón eliminar */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Badge tipo archivo */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {uploadedFile.file.type.split("/")[1].toUpperCase()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
