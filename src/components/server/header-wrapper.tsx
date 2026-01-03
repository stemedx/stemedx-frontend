import { createClient } from "@/lib/services/supabase/server";
import { Header } from "@/components/layouts/header";

export async function HeaderWrapper() {
  const supabase = await createClient();

  // Get user claims on server side
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims || null;

  return <Header claims={claims} />;
}
