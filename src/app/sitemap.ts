import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/artist-representation` },
    { url: `${SITE_URL}/church-concert-booking` },
    ...artists.map((artist) => ({ url: `${SITE_URL}/artists/${artist.slug}` })),
  ];
}
