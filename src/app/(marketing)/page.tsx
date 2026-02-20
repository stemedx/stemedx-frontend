import { createClient } from "@/lib/services/auth/server";
import Home from "@/components/home";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;

  console.log("Server: claims =", data?.claims);
  console.log("Server: isAuthenticated =", isAuthenticated);

  return <Home isAuthenticated={isAuthenticated} />;
}
