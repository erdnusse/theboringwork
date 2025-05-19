import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for your site
  const baseUrl = "https://www.ritabarrela.com"

  // Get the current date for lastModified
  const currentDate = new Date()

  // Define your routes and their metadata
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
