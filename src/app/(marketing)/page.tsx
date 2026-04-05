import { createClient } from "@/lib/services/auth/server";
import Home from "@/components/home";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return <Home isAuthenticated={!!data?.claims} />;
}
