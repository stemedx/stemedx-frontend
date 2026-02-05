import { HeaderWrapper } from "@/components/server/header-wrapper";
import { createClient } from "@/lib/services/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/");
  }

  return (
    <>
      <HeaderWrapper />
      <main className="pt-20 pb-10">{children}</main>
    </>
  );
}
