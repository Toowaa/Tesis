import { defineMiddleware } from "astro:middleware"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY)

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/profile", "/upload"]

  // Rutas que solo pueden acceder usuarios no autenticados
  const authRoutes = ["/login", "/register", "/sign"]

  // Rutas públicas que no necesitan redirección
  const publicRoutes = ["/", "/about", "/contact"]

  const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => url.pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => url.pathname === route)

  // Obtener tokens de las cookies
  const accessToken = cookies.get("sb-access-token")?.value
  const refreshToken = cookies.get("sb-refresh-token")?.value

  let user = null

  if (accessToken && refreshToken) {
    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (!error && authUser) {
        user = authUser
      }
    } catch (error) {
      console.error("Error validating session:", error)
      // Limpiar cookies inválidas
      cookies.delete("sb-access-token", { path: "/" })
      cookies.delete("sb-refresh-token", { path: "/" })
    }
  }

  // Redirigir usuarios no autenticados de rutas protegidas
  if (isProtectedRoute && !user) {
    return redirect("/sign")
  }

  // Redirigir usuarios autenticados de rutas de auth
  if (isAuthRoute && user) {
    return redirect("/dashboard")
  }

  // Si es ruta pública, permitir acceso sin redirección
  if (isPublicRoute) {
    context.locals.user = user
    return next()
  }

  // Agregar usuario al contexto local
  context.locals.user = user

  return next()
})
