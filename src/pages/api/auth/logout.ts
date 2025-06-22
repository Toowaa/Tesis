// src/pages/api/auth/logout.ts
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Limpiar todas las cookies de autenticación
  cookies.delete("sb-access-token", { path: "/" })
  cookies.delete("sb-refresh-token", { path: "/" })
  
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  )
}

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Limpiar todas las cookies de autenticación
  cookies.delete("sb-access-token", { path: "/" })
  cookies.delete("sb-refresh-token", { path: "/" })
  
  return redirect("/sign")
}