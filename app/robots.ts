import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"], // Public pages you want to allow
      disallow: ["/api/", "/dashboard/"], // Typically you'd want to disallow private areas
    },
    sitemap: "https://www.ritabarrela.com/sitemap.xml",
  }
}
