"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  DollarSign,
  FileText,
  Users,
  ExternalLink,
  Shield,
  Stethoscope,
  CreditCard,
  Building,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react"

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: any
  category: "salud" | "financiamiento" | "registro" | "beneficios" | "consejo"
  size: "small" | "medium" | "large"
  link: string
  priority: boolean
}

export default function InformacionServicios() {
  const [cards] = useState<ServiceCard[]>([
    // Salud y protección ocupacional
    {
      id: "sis",
      title: "Seguro Integral de Salud (SIS)",
      description: "Afiliación gratuita al SIS para acceder a consultas, medicinas y exámenes básicos sin costo.",
      icon: Heart,
      category: "salud",
      size: "large",
      link: "https://www.gob.pe/sis",
      priority: true,
    },
    {
      id: "vacunacion",
      title: "Programas de Vacunación",
      description: "Campañas de vacunación (tétanos, hepatitis B) y normas de bioseguridad.",
      icon: Shield,
      category: "salud",
      size: "medium",
      link: "https://www.gob.pe/institucion/minsa/noticias/1156331-minsa-lima-metropolitana-tendra-mas-de-400-puntos-de-vacunacion-en-semana-de-vacunacion-en-las-americas",
      priority: false,
    },
    {
      id: "capacitacion-salud",
      title: "Capacitación en Salud Ocupacional",
      description: "Talleres gratuitos sobre manejo seguro de residuos y uso de EPP.",
      icon: Stethoscope,
      category: "salud",
      size: "medium",
      link: "https://www.senati.edu.pe/capacitacion",
      priority: false,
    },

    // Financiamiento
    {
      id: "fonam",
      title: "Fondo Nacional del Ambiente",
      description: "Líneas de crédito blando para recicladores formalizados, equipos y vehículos.",
      icon: DollarSign,
      category: "financiamiento",
      size: "large",
      link: "https://www.minam.gob.pe/fonam/",
      priority: true,
    },
    {
      id: "microfinanzas",
      title: "Banca de las Oportunidades",
      description: "Microcréditos y ahorro programado para actividades productivas.",
      icon: CreditCard,
      category: "financiamiento",
      size: "medium",
      link: "https://www.cofide.com.pe",
      priority: false,
    },
    {
      id: "incentivos",
      title: "Incentivos Tributarios",
      description: "Acceso al RUS o RER con tasas reducidas una vez formalizado.",
      icon: FileText,
      category: "financiamiento",
      size: "small",
      link: "https://www.gob.pe/6988-conocer-el-regimen-tributario-para-mi-negocio-nuevo-regimen-unico-simplificado-nrus",
      priority: false,
    },

    // Registro y formalización
    {
      id: "registro-municipal",
      title: "Registro Municipal de Recicladores",
      description: "Carné identificatorio y autorización oficial para recolección de residuos.",
      icon: Building,
      category: "registro",
      size: "large",
      link: "https://www.gob.pe/23077",
      priority: true,
    },
    {
      id: "requisitos",
      title: "Requisitos de Formalización",
      description: "Formularios, capacitación, vacunación y EPP necesarios.",
      icon: CheckCircle,
      category: "registro",
      size: "medium",
      link: "https://www.gob.pe/26362-registrar-organizaciones-de-recicladores-en-la-municipalidad?child=24197",
      priority: false,
    },

    // Otros beneficios
    {
      id: "programas-sociales",
      title: "Programas Sociales MIDIS",
      description: "Acceso a bonos y comedores populares según criterios de vulnerabilidad.",
      icon: Users,
      category: "beneficios",
      size: "medium",
      link: "https://www.gob.pe/midis",
      priority: false,
    },
    {
      id: "essalud",
      title: "Seguridad Social",
      description: "Afiliación a EsSalud o SCTR para cobertura de accidentes laborales.",
      icon: Shield,
      category: "beneficios",
      size: "small",
      link: "https://www.gob.pe/12947-consultar-si-tu-seguro-essalud-esta-activo",
      priority: false,
    },
    {
      id: "capacitacion-continua",
      title: "Capacitación Continua",
      description: "Cursos de gestión ambiental y emprendimiento del MINAM.",
      icon: GraduationCap,
      category: "beneficios",
      size: "small",
      link: "https://www.gob.pe/institucion/minam/campa%C3%B1as",
      priority: false,
    },

    // Consejos
    {
      id: "asociarse",
      title: "Asóciese",
      description: "Forme una Asociación de Recicladores con personería jurídica.",
      icon: Users,
      category: "consejo",
      size: "small",
      link: "https://www.gob.pe/institucion/sunarp/institucional",
      priority: false,
    },
    {
      id: "capacitese",
      title: "Capacítese",
      description: "Participe en cursos de SENATI, MINSA y municipalidad.",
      icon: GraduationCap,
      category: "consejo",
      size: "small",
      link: "https://www.gob.pe/institucion/mtpe/campa%C3%B1as",
      priority: false,
    },
    {
      id: "ruc",
      title: "Gestione su RUC",
      description: "Obtenga RUC para emitir comprobantes y acceder a créditos.",
      icon: FileText,
      category: "consejo",
      size: "small",
      link: "https://www.sunat.gob.pe",
      priority: false,
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "salud":
        return "from-red-500/20 to-pink-500/20 border-red-200"
      case "financiamiento":
        return "from-green-500/20 to-emerald-500/20 border-green-200"
      case "registro":
        return "from-blue-500/20 to-cyan-500/20 border-blue-200"
      case "beneficios":
        return "from-purple-500/20 to-violet-500/20 border-purple-200"
      case "consejo":
        return "from-orange-500/20 to-yellow-500/20 border-orange-200"
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "salud":
        return Heart
      case "financiamiento":
        return DollarSign
      case "registro":
        return Building
      case "beneficios":
        return Users
      case "consejo":
        return Lightbulb
      default:
        return FileText
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "salud":
        return "Salud y Protección"
      case "financiamiento":
        return "Financiamiento"
      case "registro":
        return "Registro y Formalización"
      case "beneficios":
        return "Beneficios Sociales"
      case "consejo":
        return "Consejos"
      default:
        return "Información"
    }
  }

  const getCardSize = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1"
      case "medium":
        return "col-span-1 md:col-span-2 row-span-1"
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-3 row-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  const priorityCards = cards.filter((card) => card.priority)
  const regularCards = cards.filter((card) => !card.priority)

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Servicios para Recicladores</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Accede a servicios de salud, financiamiento, formalización y beneficios sociales disponibles para recicladores
          en Perú
        </p>
      </div>

      {/* Cards Prioritarias */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Servicios Prioritarios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityCards.map((card) => {
            const IconComponent = card.icon
            const CategoryIcon = getCategoryIcon(card.category)

            return (
              <Card
                key={card.id}
                className={`${getCardSize(card.size)} bg-gradient-to-br ${getCategoryColor(card.category)} backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                onClick={() => window.open(card.link, "_blank")}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white/50">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {getCategoryTitle(card.category)}
                      </Badge>
                    </div>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{card.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/50 hover:bg-white/80 group-hover:translate-x-1 transition-transform"
                  >
                    Más información
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Bento Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-fr">
        {regularCards.map((card) => {
          const IconComponent = card.icon
          const CategoryIcon = getCategoryIcon(card.category)

          return (
            <Card
              key={card.id}
              className={`${getCardSize(card.size)} bg-gradient-to-br ${getCategoryColor(card.category)} backdrop-blur-sm border hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
              onClick={() => window.open(card.link, "_blank")}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white/50">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {getCategoryTitle(card.category)}
                  </Badge>
                </div>
                <CardTitle className="text-sm leading-tight">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{card.description}</p>
                <div className="flex items-center text-xs text-blue-600 group-hover:text-blue-800">
                  <span>Ver más</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Consejos Rápidos */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Consejos para la Formalización
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards
            .filter((card) => card.category === "consejo")
            .map((card) => {
              const IconComponent = card.icon

              return (
                <Card
                  key={card.id}
                  className="bg-gradient-to-br from-yellow-100/50 to-orange-100/50 backdrop-blur-sm border border-yellow-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => card.link !== "#" && window.open(card.link, "_blank")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-yellow-200/50">
                        <IconComponent className="w-4 h-4 text-yellow-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-xs text-gray-600">{card.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>

      {/* Footer con información adicional */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Necesitas más información?</h3>
          <p className="text-gray-600 mb-4">
            Contacta con tu municipalidad local o visita los enlaces oficiales para obtener información actualizada
            sobre estos servicios.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">MINAM</Badge>
            <Badge variant="outline">SENATI</Badge>
            <Badge variant="outline">MINSA</Badge>
            <Badge variant="outline">MIDIS</Badge>
            <Badge variant="outline">SUNAT</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
