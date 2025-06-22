import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const provider = formData.get("provider") as Provider;

  const validProviders = ["google"];
  
  // CORREGIR: La lógica estaba invertida
  if (!provider || !validProviders.includes(provider)) {
    console.error("Invalid provider:", provider);
    return redirect("/login?error=invalid_provider");
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: "http://localhost:4321/api/auth/callback",
      }
    });

    if (error) {
      console.error("Error during sign-in:", error);
      return redirect("/login?error=login");
    }

    // IMPORTANTE: Redirigir a la URL de OAuth que devuelve Supabase
    if (data.url) {
      return redirect(data.url);
    }

    return redirect("/login?error=no_url");
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return redirect("/login?error=unexpected");
  }
};