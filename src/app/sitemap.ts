import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: "2026-09-16" },
    { url: `${SITE_URL}/artist-representation` },
    { url: `${SITE_URL}/church-concert-booking` },
    // Date of the source-checked biography and hosting-information revision.
    // Update only with substantive page changes, never automatically at build time.
    ...artists.map((artist) => ({ url: `${SITE_URL}/artists/${artist.slug}`, lastModified: "2026-09-14" })),
  ];
}
