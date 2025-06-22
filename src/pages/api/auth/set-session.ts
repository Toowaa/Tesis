// src/pages/api/auth/set-session.ts
import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { access_token, refresh_token } = await request.json()

    if (!access_token || !refresh_token) {
      return new Response(
        JSON.stringify({ error: "Tokens requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    // Verificar que los tokens sean válidos
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })

    if (error || !data.session) {
      return new Response(
        JSON.stringify({ error: "Tokens inválidos" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Establecer cookies en el servidor
    cookies.set("sb-access-token", access_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      httpOnly: false,
      secure: import.meta.env.PROD,
      sameSite: "lax"
    })

    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      httpOnly: false,
      secure: import.meta.env.PROD,
      sameSite: "lax"
    })

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error setting session:", error)
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}