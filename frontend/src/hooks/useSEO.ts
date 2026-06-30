import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  schemaJson?: any;
}

export const useSEO = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://ayushshakya.com/portrait.jpg",
  schemaJson,
}: SEOProps) => {
  useEffect(() => {
    // 1. Format and update document title
    const formattedTitle = title.includes("Ayush Shakya") ? title : `${title} | Ayush Shakya`;
    document.title = formattedTitle;

    // Helper: Gets or creates meta elements in HTML head
    const getOrCreateMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    // 2. Update meta description
    getOrCreateMeta("name", "description", description);

    // 3. Update Open Graph properties
    getOrCreateMeta("property", "og:title", formattedTitle);
    getOrCreateMeta("property", "og:description", description);
    getOrCreateMeta("property", "og:type", ogType);
    getOrCreateMeta("property", "og:image", ogImage);
    getOrCreateMeta("property", "og:site_name", "Ayush Shakya");

    // 4. Update Twitter Card properties
    getOrCreateMeta("name", "twitter:card", "summary_large_image");
    getOrCreateMeta("name", "twitter:title", formattedTitle);
    getOrCreateMeta("name", "twitter:description", description);
    getOrCreateMeta("name", "twitter:image", ogImage);

    // 5. Update Canonical link
    const finalCanonical = canonicalUrl || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", finalCanonical);

    // 6. Inject JSON-LD Schema Script
    let schemaScript = document.getElementById("json-ld-schema") as HTMLScriptElement;
    if (schemaJson) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "json-ld-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaJson);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Cleanup injected JSON-LD schema block on unmount
      const scriptNode = document.getElementById("json-ld-schema");
      if (scriptNode) scriptNode.remove();
    };
  }, [title, description, canonicalUrl, ogType, ogImage, schemaJson]);
};
