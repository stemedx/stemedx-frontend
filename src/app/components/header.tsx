import { createClient } from "@/utils/supabase/server";
import { HeaderNav } from "./header-nav";

export async function Header() {
  const supabase = await createClient();
  
  // Get user claims on server side
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims || null;

  return <HeaderNav claims={claims} />;
}
