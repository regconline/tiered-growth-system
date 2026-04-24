import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { serviceDetails } from "@/data/serviceDetails";
import { domains } from "@/data/domains";
import { locations } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: SITE.url + "/about/", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE.url + "/contact/", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE.url + "/services/", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE.url + "/domains/", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE.url + "/locations/", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE.url + "/blog/", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${SITE.url}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const domainRoutes: MetadataRoute.Sitemap = domains.map((d) => ({
    url: `${SITE.url}/domains/${d.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE.url}/healthcare-marketing-${l.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}/`,
    lastModified: p.updatedDate ?? p.pubDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...domainRoutes, ...locationRoutes, ...blogRoutes];
}
