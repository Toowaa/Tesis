"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Upload, ImageIcon, ChevronLeft, ChevronRight, FolderOpen, Heart, Trash2 } from "lucide-react"
import UserProfileMenu from "./user-profile-menu"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-collapse después de 3 segundos sin hover
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (!isHovered) {
      timer = setTimeout(() => {
        setIsCollapsed(true)
      }, 3000)
    } else {
      setIsCollapsed(false)
    }
    return () => clearTimeout(timer)
  }, [isHovered])

  const menuItems = [
    { icon: Home, label: "Inicio", active: false },
    { icon: Upload, label: "Subir fotos", active: true },
    { icon: ImageIcon, label: "Galería", active: false },
    { icon: FolderOpen, label: "Álbumes", active: false },
    { icon: Heart, label: "Favoritos", active: false },
    { icon: Trash2, label: "Papelera", active: false },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-lg",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <div className={cn("flex items-center space-x-2", isCollapsed && "justify-center")}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && <span className="font-semibold text-gray-900">PhotoApp</span>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("h-8 w-8 p-0", isCollapsed && "hidden")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                isCollapsed ? "px-2" : "px-3",
                item.active && "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* User Profile Menu */}
        <div className="border-t border-gray-200 p-2">{isCollapsed ? <UserProfileMenu /> : <UserProfileMenu />}</div>
      </div>
    </div>
  )
}
