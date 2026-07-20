import Link from "next/link";
import type { Artist } from "@/data/artists";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-2xl group-hover:shadow-accent/5">
        {/* Artist image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-95" />

        {/* Subtle top gradient for text legibility */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/50 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-accent mb-2">
            {artist.genre}
          </span>
          <h3 className="text-lg font-serif font-bold text-foreground leading-tight mb-1">
            {artist.name}
          </h3>
          <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
            {artist.shortBio}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            View Artist
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/20 transition-all duration-300" />
      </div>
    </Link>
  );
}
