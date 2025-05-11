import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

export const SchemaOrg = () => {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();

  // Construct canonical URL for Polish version
  const baseUrl = "https://stylowefryzury.netlify.app";
  const canonicalUrl = `${baseUrl}${location}`;

  const salonSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://stylowefryzury.netlify.app",
    name: t("schema.salonName"),
    description: t("schema.salonDescription"),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("schema.streetAddress"),
      addressLocality: "Radom",
      postalCode: "26-604",
      addressCountry: "PL",
    },
    telephone: "+48 797 879 002",
    email: "kontakt@agilera.pl",
    url: "https://stylowefryzury.netlify.app",
    image: "/assets/a.png",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: ["https://facebook.com/agilera", "https://instagram.com/agilera"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("schema.salonName"),
    url: "https://stylowefryzury.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://stylowefryzury.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const getBreadcrumbList = () => {
    if (location === "/") return null;

    const pathSegments = location.split("/").filter(Boolean);
    const itemListElement = pathSegments.map(
      (segment: string, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t(`breadcrumbs.${segment}`),
        item: `https://stylowefryzury.netlify.app/${pathSegments
          .slice(0, index + 1)
          .join("/")}`,
      })
    );

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    };
  };

  const breadcrumbSchema = getBreadcrumbList();

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      {i18n.language === "en" && (
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${location}`} />
      )}
      <link rel="alternate" hrefLang="pl" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <script type="application/ld+json">{JSON.stringify(salonSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};
