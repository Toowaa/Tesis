"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Home,
  Upload,
  History,
  User,
  ChevronLeft,
  ChevronRight,
  Info,
  Shield,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({
  className,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-collapse después de 3 segundos sin hover
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered) {
      timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 3000);
    } else {
      setIsCollapsed(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const menuItems = [
    { icon: Home, label: "Inicio", section: "inicio" },
    { icon: Upload, label: "Subir fotos", section: "upload" },
    { icon: History, label: "Historial", section: "historial" },
    { icon: Info, label: "Servicios", section: "servicios" },
    { icon: Shield, label: "Privacidad", section: "privacidad" },
  ];

  const bottomItems = [{ icon: User, label: "Perfil", section: "perfil" }];

  const handleSectionClick = (section: string) => {
    onSectionChange(section);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-lg",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <a href="/" className="block">
            <div
              className={cn(
                "flex items-center space-x-2",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-gray-900">Search It</span>
              )}
            </div>
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("h-8 w-8 p-0", isCollapsed && "hidden")}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={activeSection === item.section ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10 transition-all duration-200",
                isCollapsed ? "px-2" : "px-3",
                activeSection === item.section &&
                  "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
              )}
              onClick={() => handleSectionClick(item.section)}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-gray-200 p-2 space-y-1">
          {bottomItems.map((item, index) => (
            <Button
              key={index}
              variant={activeSection === item.section ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10 transition-all duration-200",
                isCollapsed ? "px-2" : "px-3",
                activeSection === item.section &&
                  "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
              )}
              onClick={() => handleSectionClick(item.section)}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
