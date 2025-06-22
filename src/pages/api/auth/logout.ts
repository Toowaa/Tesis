import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Limpiar cookies de autenticación
  cookies.delete("sb-access-token", { path: "/" })
  cookies.delete("sb-refresh-token", { path: "/" })

  return redirect("/login")
}
