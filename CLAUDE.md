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

## Styling Guidelines

### Background & Theme Standards

**1. Global Background:**
- Black background (`bg-black`) is applied globally in `layout.tsx`
- Individual pages should NOT define background colors
- Only component-specific backgrounds are allowed in pages

**2. Theme Gradient System:**
- Primary purple-blue gradient defined in `globals.css`
- Available utility classes:
  - `.bg-primary-gradient` - Main theme gradient (purple to blue)
  - `.bg-secondary-gradient` - Secondary gradient variant
  - `.bg-theme-gradient` - 135deg diagonal gradient for cards/sections
  - `.text-primary-gradient` - Gradient text effect

**3. Component Styling:**
- Use glassmorphism for cards: `bg-white/10 backdrop-blur-md border border-white/20`
- Text colors on black background: `text-white` for headings, `text-gray-300` for body text
- Gradient backgrounds for interactive elements and feature cards

**4. CSS Variable System:**
```css
--primary-start: #9333ea;    /* purple-600 */
--primary-end: #2563eb;      /* blue-600 */
--secondary-start: #a855f7;  /* purple-500 */
--secondary-end: #3b82f6;    /* blue-500 */
```

## Development Approach Guidelines

### Critical Instructions
**1. Minimal Changes Only:**
- Only add what is absolutely necessary to fix the issue
- Do NOT change existing styles unless they directly conflict with the new addition
- If something becomes unnecessary due to new additions, then remove it
- Do not make "genius" improvements or optimizations unless explicitly requested

**2. Change Validation:**
- If user says there is no change or improvement, immediately revert the last change
- Always test that changes actually solve the reported problem
- Do not argue about effectiveness - if user says it doesn't work, revert immediately

**3. Global vs Page-Level Changes:**
- For layout, responsiveness, and site-wide styling: make changes in `layout.tsx` or global CSS files
- Do NOT add the same responsive classes to individual pages
- Think globally first, then page-specific only if absolutely necessary

## Project Information
- Framework: Next.js 15.5.0 with App Router
- Styling: Tailwind CSS v4
- State Management: React hooks
- Package Manager: pnpm