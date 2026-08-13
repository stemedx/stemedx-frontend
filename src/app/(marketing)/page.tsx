import { createClient } from "@/lib/services/auth/server";
import Home from "@/components/home";
import type { Metadata } from "next";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} – Online ICT Learning`,
  description: "ශ්‍රී ලංකාවේ ප්‍රමුඛතම සබැඳි (Online) තොරතුරු හා සන්නිවේදන තාක්ෂණ ඉගෙනුම් වේදිකාව",
  alternates: { canonical: BRAND.website },
  openGraph: {
    title: `${BRAND.name} – Online ICT Learning`,
    description: "ශ්‍රී ලංකාවේ ප්‍රමුඛතම සබැඳි (Online) තොරතුරු හා සන්නිවේදන තාක්ෂණ ඉගෙනුම් වේදිකාව",
    url: BRAND.website,
    type: "website",
    images: [{ url: `${BRAND.website}/og-image.png`, width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BRAND.website}/og-image.png`],
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return <Home isAuthenticated={!!data?.claims} />;
}
