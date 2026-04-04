import "./globals.css";
import { CustomScrollbar } from "@/components/ui/scrollbar";
import { EmailVerificationBanner } from "@/components/ui/email-verification-banner";
import { LanguageProvider } from "@/context/language-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND } from "@/lib/constants/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BRAND.metaTitle,
  description: BRAND.metaDescription,
  openGraph: {
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    url: BRAND.website,
    siteName: BRAND.name,
    images: [
      {
        url: `${BRAND.website}/og-image.png`,
        width: 1200,
        height: 630,
        alt: BRAND.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    images: [`${BRAND.website}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col bg-black`}
      >
          <CustomScrollbar />
          <EmailVerificationBanner />
          <LanguageProvider>
            {children}
          </LanguageProvider>
      </body>
    </html>
  );
}
