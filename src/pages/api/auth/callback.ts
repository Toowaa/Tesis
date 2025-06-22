import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get("code");
  
  if (!authCode) {
    console.error("Authorization code not found");
    return redirect("/login?error=no_code");
  }

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
    
    if (error) {
      console.error("Error exchanging code for session:", error);
      return redirect("/login?error=auth");
    }

    if (!data.session) {
      console.error("No session returned");
      return redirect("/login?error=no_session");
    }

    const { access_token, refresh_token } = data.session;
    
    // Configurar cookies con opciones más seguras
    cookies.set("access_token", access_token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    
    cookies.set("refresh_token", refresh_token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return redirect("/dashboard");
    
  } catch (error) {
    console.error("Unexpected error in callback:", error);
    return redirect("/");
  }
};