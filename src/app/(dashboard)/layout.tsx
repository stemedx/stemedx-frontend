import { HeaderWrapper } from "@/components/server/header-wrapper";
import { Footer } from "@/components/layouts/footer";
import { createClient } from "@/lib/services/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { claims } } = await supabase.auth.getClaims();

  console.log(claims)
  if (!claims) {
    redirect("/");
  }

  return (
    <>
      <HeaderWrapper />
      <main className="pt-24 pb-10">{children}</main>
      <Footer />
    </>
  );
}
