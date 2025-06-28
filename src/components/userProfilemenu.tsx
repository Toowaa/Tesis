"use client"


import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/Separator"
import {

  LogOut,
  Camera,

  Crown,    
  Calendar,
  Activity,
} from "lucide-react"

export default function UserProfileMenu({ user }: { user: any }) {
  // Helper function para formatear fechas
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Fecha no disponible'
    }
  }

  // Helper function para calcular último acceso
  const getLastActiveText = (dateString: string) => {
    try {
      const lastSign = new Date(dateString)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - lastSign.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Activo ahora'
      if (diffInHours < 24) return `Hace ${diffInHours} horas`
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays} días`
    } catch {
      return 'Actividad no disponible'
    }
  }

  // Extraer datos del usuario
  const userData = {
    name: user?.user_metadata?.full_name || user?.user_metadata?.name || 'Usuario',
    email: user?.email || 'Email no disponible',
    avatar: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "/placeholder.svg",
    plan: "Premium", // Por defecto, puedes cambiarlo según tu lógica
    joinDate: formatDate(user?.created_at),
    lastActive: getLastActiveText(user?.last_sign_in_at),
    emailVerified: user?.user_metadata?.email_verified || false,
    provider: user?.app_metadata?.provider || 'unknown',
    stats: {
      photosUploaded: 847, // Datos mock - puedes reemplazar con datos reales de tu BD
      earnings: 2340,
      storageUsed: 2.3,
      storageTotal: 0
    }
  }

  

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Debug info - remover en producción */}
   

      {/* Profile Header Card */}
      <Card className="overflow-hidden">
        <CardContent className="relative py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-12">
            <div className="relative">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              <Button
                size="sm"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full p-0 bg-green-600 hover:bg-green-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  {userData.plan}
                </Badge>
                {userData.emailVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ✓ Verificado
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{userData.email}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {userData.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>{userData.lastActive}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Conectado via {userData.provider}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

   

      {/* Menu Options */}
      <Card>
       
        <CardContent className="space-y-1">
         
          <Separator className="my-0" />
        <form action="/api/auth/logout" method="post"
        >
          <Button variant="ghost"  className="w-full justify-start h-auto p-4 text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Cerrar sesión</div>
              <div className="text-sm text-red-500">Salir de tu cuenta</div>
            </div>
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}