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

export const translations = {
  en: {
    reachus: enReachusContent,
    home: enHomeContent,
    auth: enAuthContent,
    navbar: enNavbarContent,
    tutorials: enTutorialsContent,
    // Add more page translations here
    // courses: enCoursesContent,
  },
  si: {
    reachus: siReachusContent,
    home: siHomeContent,
    auth: siAuthContent,
    navbar: siNavbarContent,
    tutorials: siTutorialsContent,
    // Add more page translations here
    // courses: siCoursesContent,
  }
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;

// Helper function to get translations for a specific page and language
export function getTranslations(page: TranslationKeys, language: Language = 'en') {
  return translations[language][page];
}

// Current language - can be made dynamic with context/state later
export const CURRENT_LANGUAGE: Language = 'en';