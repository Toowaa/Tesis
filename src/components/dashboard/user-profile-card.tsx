"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/Separator"
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  Camera,
  Edit3,
  Bell,
  Shield,
  Palette,
  Mail,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function UserProfileCard() {
  // Datos simulados del usuario
  const userData = {
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "/placeholder.svg?height=120&width=120",
    plan: "Premium",
    photosUploaded: 1247,
    storageUsed: 2.4,
    storageTotal: 10,
    memberSince: "Enero 2023",
    lastActive: "Hace 2 horas",
  }

  const storagePercentage = (userData.storageUsed / userData.storageTotal) * 100

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback className="text-2xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full shadow-md"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1 mt-4">
          <div className="flex items-center justify-center space-x-2">
            <CardTitle className="text-xl">{userData.name}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Crown className="h-3 w-3 mr-1" />
              {userData.plan}
            </Badge>
          </div>
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <Mail className="h-3 w-3 mr-1" />
            {userData.email}
          </div>
          <div className="flex items-center justify-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Miembro desde {userData.memberSince}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <BarChart3 className="h-4 w-4 text-blue-600 mr-1" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{userData.photosUploaded}</p>
            <p className="text-xs text-blue-600">Fotos subidas</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Crown className="h-4 w-4 text-green-600 mr-1" />
            </div>
            <p className="text-2xl font-bold text-green-600">{userData.plan}</p>
            <p className="text-xs text-green-600">Plan actual</p>
          </div>
        </div>

        {/* Storage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Almacenamiento</span>
            <span className="font-medium">
              {userData.storageUsed} GB / {userData.storageTotal} GB
            </span>
          </div>
          <Progress value={storagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {(userData.storageTotal - userData.storageUsed).toFixed(1)} GB disponibles
          </p>
        </div>

        <Separator />

        {/* Menu Options */}
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start h-10">
            <User className="mr-3 h-4 w-4" />
            Mi perfil
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10">
            <Edit3 className="mr-3 h-4 w-4" />
            Editar perfil
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10">
            <Settings className="mr-3 h-4 w-4" />
            Configuración
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10">
            <Bell className="mr-3 h-4 w-4" />
            Notificaciones
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10">
            <Palette className="mr-3 h-4 w-4" />
            Tema y apariencia
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10">
            <Shield className="mr-3 h-4 w-4" />
            Privacidad
          </Button>
        </div>

        <Separator />

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start h-10">
            <HelpCircle className="mr-3 h-4 w-4" />
            Ayuda y soporte
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10 text-red-600 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-3 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>

        {/* Status */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">Última actividad: {userData.lastActive}</p>
        </div>
      </CardContent>
    </Card>
  )
}
