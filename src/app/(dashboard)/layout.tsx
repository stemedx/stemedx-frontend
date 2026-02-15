import { HeaderWrapper } from "@/components/server/header-wrapper";
import { createClient } from "@/lib/services/auth/server";
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
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-purple-900/30 to-black">
      <HeaderWrapper />
      <main className="pt-20 pb-10">{children}</main>
    </div>
  );
}
