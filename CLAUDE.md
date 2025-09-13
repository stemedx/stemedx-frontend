# StemXio Development Guidelines

## Component Development Standards

### Localization & CMS Integration Structure

**1. Localization File Organization:**
```
src/locales/
├── index.ts           # Central localization hub
├── en/               # English translations
│   ├── reachus.ts    # Per-route translation files
│   ├── home.ts
│   └── courses.ts
└── si/               # Sinhala translations
    ├── reachus.ts
    ├── home.ts
    └── courses.ts
```

**2. Translation File Structure:**
```javascript
// src/locales/en/pagename.ts
export const pageContent = {
  section: {
    title: "English Title",
    fields: {
      label: "English Label"
    }
  }
};
```

**3. Component Integration Pattern:**
```javascript
// In page components
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
const CONTENT = getTranslations('pagename', CURRENT_LANGUAGE);
```

**4. CMS-Ready Architecture:**
- Use separate files for each route/page translations
- Structure content objects to match CMS schema
- Include unique identifiers for CMS entries
- Organize by UI sections for easy CMS mapping

**5. Multi-language Support:**
- Currently supporting: English (`en`), Sinhala (`si`)
- Easy to add new languages by creating new folders
- Central language switching via `CURRENT_LANGUAGE` in `/locales/index.ts`

**6. Future CMS Integration:**
- Translation files can be replaced with CMS API calls
- Structure matches Directus collection schemas
- Components remain unchanged when switching to CMS data
- Ready for dynamic language switching and user preferences

## Project Information
- Framework: Next.js 15.5.0 with App Router
- Styling: Tailwind CSS v4
- State Management: React hooks
- Package Manager: pnpm