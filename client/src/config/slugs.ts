export const PAGE_KEYS = {
  HOME: "home",
  ABOUT: "about",
  SERVICES: "services",
  SERVICES_HAIRCUT: "services-haircut",
  SERVICES_STYLING: "services-styling",
  SERVICES_COLORING: "services-coloring",
  GALLERY: "gallery", // Klucz pozostaje ten sam
  CONTACT: "contact",
  PRIVACY_POLICY: "privacy-policy",
  TERMS: "terms",
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

interface LocalizedSlugs {
  [lang: string]: {
    [key in PageKey]?: string;
  };
}

export const localizedSlugs: LocalizedSlugs = {
  en: {
    [PAGE_KEYS.HOME]: "",
    [PAGE_KEYS.ABOUT]: "about",
    [PAGE_KEYS.SERVICES]: "services",
    [PAGE_KEYS.SERVICES_HAIRCUT]: "services-haircut",
    [PAGE_KEYS.SERVICES_STYLING]: "services-styling",
    [PAGE_KEYS.SERVICES_COLORING]: "services-coloring",
    [PAGE_KEYS.GALLERY]: "style-collection", // <-- ZMIANA TUTAJ
    [PAGE_KEYS.CONTACT]: "contact",
    [PAGE_KEYS.PRIVACY_POLICY]: "privacy-policy",
    [PAGE_KEYS.TERMS]: "terms",
  },
  pl: {
    [PAGE_KEYS.HOME]: "",
    [PAGE_KEYS.ABOUT]: "o-nas",
    [PAGE_KEYS.SERVICES]: "uslugi",
    [PAGE_KEYS.SERVICES_HAIRCUT]: "uslugi-strzyzenie",
    [PAGE_KEYS.SERVICES_STYLING]: "uslugi-stylizacja",
    [PAGE_KEYS.SERVICES_COLORING]: "uslugi-koloryzacja",
    [PAGE_KEYS.GALLERY]: "kolekcja-stylizacji", // <-- ZMIANA TUTAJ
    [PAGE_KEYS.CONTACT]: "kontakt",
    [PAGE_KEYS.PRIVACY_POLICY]: "polityka-prywatnosci",
    [PAGE_KEYS.TERMS]: "regulamin",
  },
};

// Funkcje getLocalizedSlug i getCanonicalKeyFromSlug pozostają bez zmian
export const getLocalizedSlug = (key: PageKey, lang: string): string => {
  const slug = localizedSlugs[lang]?.[key];
  if (key === PAGE_KEYS.HOME && slug === "") return "";
  return slug ?? localizedSlugs["en"]?.[key] ?? key;
};

export const getCanonicalKeyFromSlug = (
  slugToFind: string,
  lang: string
): PageKey | undefined => {
  if (slugToFind === "") {
    for (const key in localizedSlugs[lang]) {
      if (localizedSlugs[lang]?.[key as PageKey] === "") {
        return key as PageKey;
      }
    }
    if (lang !== "en") {
      for (const key in localizedSlugs["en"]) {
        if (localizedSlugs["en"]?.[key as PageKey] === "") {
          return key as PageKey;
        }
      }
    }
  }

  const langSlugs = localizedSlugs[lang];
  if (langSlugs) {
    for (const key in langSlugs) {
      if (langSlugs[key as PageKey] === slugToFind) {
        return key as PageKey;
      }
    }
  }
  if (lang !== "en") {
    const enSlugs = localizedSlugs["en"];
    if (enSlugs) {
      for (const key in enSlugs) {
        if (enSlugs[key as PageKey] === slugToFind) {
          return key as PageKey;
        }
      }
    }
  }
  return undefined;
};
