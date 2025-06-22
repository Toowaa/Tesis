import { defineMiddleware } from "astro:middleware"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY)

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/profile", "/upload", "/settings"]

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

  // Debug logs
  console.log("🔍 Middleware Debug:", {
    pathname: url.pathname,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    isProtectedRoute,
    isAuthRoute
  })

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
        
        // Actualizar cookies si hay una nueva sesión
        const { data: session } = await supabase.auth.getSession()
        if (session.session) {
          cookies.set("sb-access-token", session.session.access_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 días
            sameSite: "lax",
            secure: import.meta.env.PROD,
            httpOnly: false
          })
          cookies.set("sb-refresh-token", session.session.refresh_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 días
            sameSite: "lax",
            secure: import.meta.env.PROD,
            httpOnly: false
          })
        }
      } else {
        // Si hay error, limpiar cookies
        cookies.delete("sb-access-token", { path: "/" })
        cookies.delete("sb-refresh-token", { path: "/" })
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