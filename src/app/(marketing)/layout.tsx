import { HeaderWrapper } from "@/components/server/header-wrapper";
import { Footer } from "@/components/layouts/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper />
      <main className="pt-24 pb-10">{children}</main>
      <Footer />
    </>
  );
}
