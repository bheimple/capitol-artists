"use client";

import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/data/artists";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-2xl group-hover:shadow-accent/10 group-hover:-translate-y-1">
        {/* Artist image */}
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay - deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 transition-opacity duration-500 group-hover:from-background group-hover:via-background/85" />

        {/* Subtle top gradient for text legibility */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/60 to-transparent" />

        {/* Gold glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent/5 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-accent mb-2">
            {artist.genre}
          </span>
          <h3 className="text-lg font-serif font-bold text-foreground leading-tight mb-1">
            {artist.name}
          </h3>
          <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3 max-h-0 group-hover:max-h-20 opacity-70 group-hover:opacity-100 overflow-hidden transition-all duration-500">
            {artist.shortBio}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View Artist
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Hover glow ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/25 transition-all duration-500" />
      </div>
    </Link>
  );
}
