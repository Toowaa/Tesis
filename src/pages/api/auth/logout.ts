import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  try {
    // Obtener el token de acceso
    const accessToken = cookies.get("access_token")?.value;
    
    if (accessToken) {
      // Configurar la sesión para poder cerrarla
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: cookies.get("refresh_token")?.value || ""
      });
      
      // Cerrar sesión en Supabase
      await supabase.auth.signOut();
    }
    
    // Eliminar cookies
    cookies.delete("access_token", { path: "/" });
    cookies.delete("refresh_token", { path: "/" });
    
    return redirect("/");
    
  } catch (error) {
    console.error("Error during logout:", error);
    // Eliminar cookies aunque haya error
    cookies.delete("access_token", { path: "/" });
    cookies.delete("refresh_token", { path: "/" });
    
    // Redirigir al login aunque haya error
    return redirect("/");
  }
};