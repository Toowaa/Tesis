import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const provider = formData.get("provider") as Provider;

  const validProviders = ["google"];
  
  if (!provider || !validProviders.includes(provider)) {
    console.error("Invalid provider:", provider);
    return redirect("/login?error=invalid_provider");
  }

  // Obtener la URL base desde las variables de entorno
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321";

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${siteUrl}/api/auth/callback`,
      }
    });

    if (error) {
      console.error("Error during sign-in:", error);
      return redirect("/login?error=login");
    }

    if (data.url) {
      return redirect(data.url);
    }

    return redirect("/login?error=no_url");
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return redirect("/login?error=unexpected");
  }
};