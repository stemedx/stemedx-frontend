// Localization index file
import { reachusContent as enReachusContent } from './en/reachus';
import { reachusContent as siReachusContent } from './si/reachus';

export const translations = {
  en: {
    reachus: enReachusContent,
    // Add more page translations here
    // home: enHomeContent,
    // courses: enCoursesContent,
  },
  si: {
    reachus: siReachusContent,
    // Add more page translations here
    // home: siHomeContent,
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