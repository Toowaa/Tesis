"use client"

import { useState } from "react"
import AsideBar from "@/components/AsideBar"
import DashboardContent from "@/components/DashboardContainer"

export default function Dashboard(user: any) {
  const [activeSection, setActiveSection] = useState("upload")
  
  console.log(user) 

  return (
    <div className="min-h-screen bg-gray-50">
      <AsideBar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="pl-16 transition-all duration-300">
       
      </div>
    </div>
  )
}
