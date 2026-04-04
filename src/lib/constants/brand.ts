// ─── Brand Configuration ────────────────────────────────────────────────────
// Single source of truth for all brand-facing strings.
// To rebrand: edit the values below. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  /** Display name used in logos, headings, and titles */
  name: "ICT101",

  /** Short tagline shown under the logo (footer, etc.) */
  tagline: "Master ICT skills online with interactive courses and expert instruction",

  /** One-line description for meta / OG tags */
  metaDescription:
    "Empowering the next generation of innovators through cutting-edge ICT education",

  /** Full meta <title> */
  metaTitle: "ICT101: Next Generation ICT Education",

  /** Legal entity name used in copyright notices */
  legalName: "Accivion LLC",

  /** Primary support email */
  supportEmail: "support@ict101.com",

  /** Canonical website URL (no trailing slash) */
  website: "https://ict101.com",

  /** Social-media handle slugs – used to build full URLs in locale files */
  social: {
    facebook: "https://facebook.com/ict101",
    twitter: "https://x.com/ict101",
    whatsapp: "https://wa.me/ict101",
    telegram: "https://t.me/ict101",
  },
} as const;
