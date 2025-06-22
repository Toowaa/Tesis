"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

import { supabase } from "../lib/supabase"
import Sidebar from "./User/sidebar"
import UploadArea from "./User/upload-area"
import UploadMenu from "./User/upload-menu"

interface Props {
  user: User | null
}

export default function DashboardContent({ user: initialUser }: Props) {
  const [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        window.location.href = "/login"
      }
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Limpiar cookies
    document.cookie = "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    document.cookie = "sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    window.location.href = "/login"
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-16 transition-all duration-300">
        <div className="flex">
          <UploadArea />
        </div>
      </div>
      <UploadMenu />
    </div>
  )
}
