"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  ChevronDown,
} from "lucide-react"

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Datos simulados del usuario
  const userData = {
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "/placeholder.svg?height=80&width=80",
    plan: "Premium",
    photosUploaded: 1247,
    storageUsed: "2.4 GB",
    storageTotal: "10 GB",
    memberSince: "Enero 2023",
  }

  return (
    <div className="relative">
      {/* Dropdown Version */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-full justify-start px-3">
            <Avatar className="h-7 w-7 mr-3">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate">{userData.name}</p>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" align="start" side="right">
          <DropdownMenuLabel className="p-0">
            <div className="flex items-center space-x-3 p-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" className="absolute -bottom-1 -right-1 h-6 w-6 p-0 rounded-full">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm">{userData.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    {userData.plan}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{userData.email}</p>
                <p className="text-xs text-muted-foreground">Miembro desde {userData.memberSince}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Stats */}
          <div className="px-3 py-2">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-lg font-bold text-blue-600">{userData.photosUploaded}</p>
                <p className="text-xs text-blue-600">Fotos subidas</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-lg font-bold text-green-600">{userData.storageUsed}</p>
                <p className="text-xs text-green-600">de {userData.storageTotal}</p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Menu Items */}
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Mi perfil</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Edit3 className="mr-2 h-4 w-4" />
            <span>Editar perfil</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificaciones</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Palette className="mr-2 h-4 w-4" />
            <span>Tema y apariencia</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacidad y seguridad</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ayuda y soporte</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
