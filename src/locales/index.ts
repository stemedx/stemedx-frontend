// Localization index file
import { reachusContent as enReachusContent } from './en/reachus';
import { reachusContent as siReachusContent } from './si/reachus';
import { homeContent as enHomeContent } from './en/home';
import { homeContent as siHomeContent } from './si/home';
import { authContent as enAuthContent } from './en/auth';
import { authContent as siAuthContent } from './si/auth';
import { navbarContent as enNavbarContent } from './en/navbar';
import { navbarContent as siNavbarContent } from './si/navbar';
import { tutorialsContent as enTutorialsContent } from './en/tutorials';
import { tutorialsContent as siTutorialsContent } from './si/tutorials';
import { profileContent as enProfileContent } from './en/profile';
import { profileContent as siProfileContent } from './si/profile';
import { paymentContent as enPaymentContent } from './en/payment';
import { paymentContent as siPaymentContent } from './si/payment';
import { footerContent as enFooterContent } from './en/footer';
import { footerContent as siFooterContent } from './si/footer';
import { pricingContent as enPricingContent } from './en/pricing';
import { pricingContent as siPricingContent } from './si/pricing';

export const translations = {
  en: {
    reachus: enReachusContent,
    home: enHomeContent,
    auth: enAuthContent,
    navbar: enNavbarContent,
    tutorials: enTutorialsContent,
    profile: enProfileContent,
    payment: enPaymentContent,
    footer: enFooterContent,
    pricing: enPricingContent,
    // Add more page translations here
    // courses: enCoursesContent,
  },
  si: {
    reachus: siReachusContent,
    home: siHomeContent,
    auth: siAuthContent,
    navbar: siNavbarContent,
    tutorials: siTutorialsContent,
    profile: siProfileContent,
    payment: siPaymentContent,
    footer: siFooterContent,
    pricing: siPricingContent,
    // Add more page translations here
    // courses: siCoursesContent,
  }
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;

// Helper function to get translations for a specific page and language
export function getTranslations(page: TranslationKeys, language: Language = 'si') {
  return translations[language][page];
}

// Default language
export const CURRENT_LANGUAGE: Language = 'si';

// Server-side language helper — reads the 'lang' cookie
export async function getServerLanguage(): Promise<Language> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value;
    if (lang === "en" || lang === "si") return lang;
  } catch {
    // cookies() throws outside of server component / route handler context
  }
  return "si";
}