"use client"
import { useState } from "react"
import AsideBar from "@/components/AsideBar"
import UploadArea from "@/components/dashboard/upload-area"
import UploadMenu from "@/components/dashboard/upload-menu"
import Historial from "@/components/Historial"
import UserProfileMenu from "@/components/userProfilemenu"
import InformacionServicios from "./dashboard/Informacion"
import PrivacidadSeguridad from "./Privacidad"

// Componentes de secciones
function InicioSection() {
  return (
    <div className="flex-1 p-6">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Bienvenido a Search It!</h1>
        <p className="text-xl text-gray-600 mb-8">Detecta materiales reciclables y maximiza tus ganancias</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="font-semibold mb-2">Detecta</h3>
            <p className="text-gray-600">Toma una foto del material</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-semibold mb-2">Evalúa</h3>
            <p className="text-gray-600">Conoce su valor en tiempo real</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-semibold mb-2">Vende</h3>
            <p className="text-gray-600">Maximiza tus ganancias</p>
          </div>
        </div>
      </div>
    </div>
  )
}


function FavoritosSection() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Favoritos</h1>
      <p className="text-gray-600">Tus materiales y detecciones favoritas</p>
      <div className="mt-8 text-center py-20 bg-white rounded-lg">
        <div className="text-6xl mb-4">❤️</div>
        <p className="text-gray-500">No tienes favoritos aún...</p>
      </div>
    </div>
  )
}



function ConfiguracionSection() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h1>
      <p className="text-gray-600">Personaliza tu experiencia en Search It</p>
      <div className="mt-8 text-center py-20 bg-white rounded-lg">
        <div className="text-6xl mb-4">⚙️</div>
        <p className="text-gray-500">Panel de configuración en desarrollo...</p>
      </div>
    </div>
  )
}

interface DashboardContainerProps {
  user: any
}

export default function DashboardContainer({ user }: DashboardContainerProps) {
  const [activeSection, setActiveSection] = useState("upload")
  
  console.log('DashboardContainer - Usuario:', user)

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return <InicioSection />
      case "upload":
        return (
          <div className="flex">
            <UploadArea user={user} />
            <UploadMenu />
          </div>
        )
      case "historial":
        return <Historial user={user} />
      case "servicios":
        return <InformacionServicios />
      case "favoritos":
        return <FavoritosSection />
     case "privacidad":
        return <PrivacidadSeguridad />
      case "configuracion":
        return <ConfiguracionSection />
      case "perfil":
        return (
          <div className="flex-1 p-6">
            <UserProfileMenu user={user} />
          </div>
        )
      default:
        return (
          <div className="flex">
            <UploadArea user={user} />
            <UploadMenu />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AsideBar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="pl-16 transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  )
}