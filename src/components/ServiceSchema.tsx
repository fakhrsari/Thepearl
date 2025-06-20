
import React from "react";
import { ServiceCategory } from "@/data/servicesData";

interface ServiceSchemaProps {
  services: ServiceCategory[];
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({ services }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SpaAndBeautyBusiness",
    "name": "The Pearl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Luxury Avenue",
      "addressLocality": "Beirut",
      "addressRegion": "Beirut",
      "addressCountry": "Lebanon"
    },
    "telephone": "+961 1 234 567",
    "image": "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "priceRange": "$$$",
    "url": "https://thepearl.com",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Spa Services",
      "itemListElement": services.map((category, i) => ({
        "@type": "OfferCatalog",
        "name": category.category,
        "itemListElement": category.items.map((item, j) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": item.name,
            "description": item.note || `${item.name} at The Pearl Spa Beirut`,
            "offers": {
              "@type": "Offer",
              "price": item.price.replace('$', ''),
              "priceCurrency": "USD"
            },
            ...(item.duration ? { "timeRequired": `PT${item.duration.replace(' min', 'M')}` } : {})
          }
        }))
      }))
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ServiceSchema;