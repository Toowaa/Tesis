"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  Database,
  Brain,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Users,
  Camera,
  Cloud,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Trash2,
  Settings,
  Globe,
} from "lucide-react"

export default function PrivacidadSeguridad() {
  const dataTypes = [
    {
      icon: Camera,
      title: "Imágenes de Materiales",
      description: "Fotografías de materiales reciclables que subes para detección",
      usage: "Procesamiento con Machine Learning para identificación automática",
      retention: "Se almacenan de forma segura hasta que decidas eliminarlas",
      security: "Encriptadas en tránsito y en reposo",
    },
    {
      icon: Brain,
      title: "Datos de Detección ML",
      description: "Resultados del análisis de Machine Learning de tus materiales",
      usage: "Mejorar la precisión del sistema y generar estadísticas personales",
      retention: "Conservados para historial personal y mejora del servicio",
      security: "Anonimizados para análisis agregados",
    },
    {
      icon: Users,
      title: "Información de Perfil",
      description: "Nombre, email y datos básicos de tu cuenta",
      usage: "Personalización de la experiencia y comunicación de servicios",
      retention: "Mientras mantengas tu cuenta activa",
      security: "Protegidos con autenticación segura",
    },
    {
      icon: MapPin,
      title: "Datos de Ubicación",
      description: "Ubicación aproximada para servicios locales (opcional)",
      usage: "Mostrar centros de reciclaje y servicios cercanos",
      retention: "Solo mientras uses funciones basadas en ubicación",
      security: "Nunca compartidos con terceros sin consentimiento",
    },
  ]

  const mlProcessing = [
    {
      step: "1",
      title: "Captura de Imagen",
      description: "Tu dispositivo captura la foto del material reciclable",
      icon: Camera,
      security: "La imagen se procesa localmente antes del envío",
    },
    {
      step: "2",
      title: "Transmisión Segura",
      description: "La imagen se envía encriptada a nuestros servidores",
      icon: Lock,
      security: "Protocolo HTTPS con certificados SSL/TLS",
    },
    {
      step: "3",
      title: "Análisis ML",
      description: "Nuestro modelo de Machine Learning analiza el material",
      icon: Brain,
      security: "Procesamiento en servidores seguros con acceso restringido",
    },
    {
      step: "4",
      title: "Resultado",
      description: "Recibes la identificación y valoración del material",
      icon: CheckCircle,
      security: "Los resultados se asocian solo a tu cuenta personal",
    },
  ]

  const rights = [
    {
      icon: Eye,
      title: "Derecho de Acceso",
      description: "Puedes solicitar una copia de todos los datos que tenemos sobre ti",
    },
    {
      icon: Settings,
      title: "Derecho de Rectificación",
      description: "Puedes corregir cualquier información incorrecta en tu perfil",
    },
    {
      icon: Trash2,
      title: "Derecho de Eliminación",
      description: "Puedes solicitar la eliminación completa de tu cuenta y datos",
    },
    {
      icon: Download,
      title: "Portabilidad de Datos",
      description: "Puedes exportar tus datos en un formato legible",
    },
    {
      icon: AlertTriangle,
      title: "Derecho de Oposición",
      description: "Puedes oponerte al procesamiento de tus datos para ciertos fines",
    },
    {
      icon: Lock,
      title: "Derecho de Limitación",
      description: "Puedes solicitar que limitemos el procesamiento de tus datos",
    },
  ]

  return (
    <div className="flex-1 p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacidad y Seguridad</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          En Search It, tu privacidad es nuestra prioridad. Te explicamos de manera transparente cómo manejamos tus
          datos, cómo funciona nuestro sistema de Machine Learning y qué derechos tienes sobre tu información personal.
        </p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Badge variant="outline" className="text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            Lima, Perú
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Calendar className="w-3 h-3 mr-1" />
            2025
          </Badge>
        </div>
      </div>

      {/* Compromiso de Privacidad */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Shield className="w-8 h-8 text-blue-600" />
            Nuestro Compromiso Contigo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Seguridad Primero</h3>
              <p className="text-sm text-gray-600">
                Utilizamos las mejores prácticas de seguridad para proteger tu información
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Transparencia Total</h3>
              <p className="text-sm text-gray-600">Te explicamos claramente qué datos recopilamos y cómo los usamos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Control Total</h3>
              <p className="text-sm text-gray-600">
                Tú decides qué datos compartir y puedes eliminarlos cuando quieras
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Datos que Recopilamos */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-600" />
          ¿Qué Datos Recopilamos?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {dataTypes.map((dataType, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <dataType.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {dataType.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{dataType.description}</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">¿Para qué lo usamos?</h4>
                    <p className="text-sm text-gray-600">{dataType.usage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">¿Cuánto tiempo lo guardamos?</h4>
                    <p className="text-sm text-gray-600">{dataType.retention}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">¿Cómo lo protegemos?</h4>
                    <p className="text-sm text-green-600 font-medium">{dataType.security}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cómo Funciona el Machine Learning */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          Cómo Funciona Nuestro Machine Learning
        </h2>
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Utilizamos tecnología de <strong>Machine Learning (ML)</strong> avanzada para identificar automáticamente
              los materiales reciclables en tus fotografías. Este proceso es completamente automatizado y diseñado para
              proteger tu privacidad en cada paso.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mlProcessing.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <step.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="bg-green-100 rounded-lg p-2">
                    <p className="text-xs text-green-700 font-medium">{step.security}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medidas de Seguridad */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Lock className="w-8 h-8 text-green-600" />
          Medidas de Seguridad Implementadas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Cloud className="w-5 h-5" />
                Encriptación de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Encriptación SSL/TLS en tránsito
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Encriptación AES-256 en reposo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Claves de encriptación rotadas regularmente
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Shield className="w-5 h-5" />
                Acceso Controlado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Autenticación de dos factores
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Acceso basado en roles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Auditorías de acceso regulares
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Smartphone className="w-5 h-5" />
                Seguridad del Dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Procesamiento local cuando es posible
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Eliminación automática de caché
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Detección de dispositivos comprometidos
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tus Derechos */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <FileText className="w-8 h-8 text-orange-600" />
          Tus Derechos sobre tus Datos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rights.map((right, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <right.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                    <p className="text-sm text-gray-600">{right.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Compartir Datos con Terceros */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-800">
            <AlertTriangle className="w-6 h-6" />
            ¿Compartimos tus Datos con Terceros?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Lo que SÍ hacemos:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Compartir datos agregados y anonimizados para investigación ambiental</li>
                <li>• Conectar con centros de reciclaje locales (solo con tu consentimiento)</li>
                <li>• Integrar con servicios de mapas para ubicaciones (datos anonimizados)</li>
                <li>• Cumplir con requerimientos legales cuando sea obligatorio</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Lo que NUNCA hacemos:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vender tu información personal a terceros</li>
                <li>• Compartir tus fotos sin tu consentimiento explícito</li>
                <li>• Usar tus datos para publicidad no relacionada con reciclaje</li>
                <li>• Transferir datos fuera de Perú sin protecciones adecuadas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacto y Soporte */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">¿Tienes Dudas o Preocupaciones?</h2>
          <p className="text-xl mb-6 opacity-90">
            Estamos aquí para ayudarte. Si tienes cualquier pregunta sobre cómo manejamos tus datos o quieres ejercer
            alguno de tus derechos, no dudes en contactarnos.
          </p>
          <div className="space-y-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.open("mailto:brahanbonilla@gmail.com", "_blank")}
            >
              <Mail className="w-5 h-5 mr-2" />
              brahanbonilla@gmail.com
            </Button>
            <div className="flex justify-center items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Lima, Perú</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>2025</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actualizaciones de Política */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Info className="w-6 h-6 text-blue-600" />
            Actualizaciones de esta Política
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Esta política de privacidad puede actualizarse ocasionalmente para reflejar cambios en nuestros servicios o
            en la legislación aplicable. Te notificaremos sobre cambios importantes a través de:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Notificación por email</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Smartphone className="w-5 h-5 text-green-600" />
              <span className="text-sm">Notificación en la app</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Aviso en nuestro sitio web</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Última actualización:</strong> Enero 2025 • <strong>Versión:</strong> 1.0 •{" "}
              <strong>Vigente desde:</strong> 01 de Enero de 2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
