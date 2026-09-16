import Link from "next/link";
import ArtistCardImage from "@/components/ArtistCardImage";
import type { Artist } from "@/data/artists";

export default function ArtistCard({
  artist,
  sizes = "(min-width: 80rem) calc(17.875rem - 2px), (min-width: 64rem) calc(25vw - 2.125rem - 2px), (min-width: 48rem) calc((100vw - 6rem) / 3 - 2px), calc(50vw - 2rem - 2px)",
}: {
  artist: Artist;
  sizes?: string;
}) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      prefetch={false}
      className="group block rounded-xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#062653]"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-2xl group-hover:shadow-accent/10 group-hover:-translate-y-1">
        {/* Sizes follow the roster's 2/3/4 columns, container padding, gaps, and card borders. */}
        <ArtistCardImage
          artist={artist}
          sizes={sizes}
        />

        {/* Sage glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent/10 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 grid gap-2 p-3 sm:p-4 lg:p-5 z-10">
          <h3 className="flex min-h-[2.5em] items-end text-base sm:text-lg font-serif font-bold text-white leading-tight [text-wrap:balance]">
            {artist.name}
          </h3>
          <div className="hidden md:block h-11">
            <span className="inline-block max-w-full rounded-md bg-[#062653] px-2 py-1 text-[11px] font-semibold leading-relaxed tracking-[0.06em] uppercase text-white">
              {artist.genre}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 group-hover:decoration-white group-focus-visible:decoration-white">
            <span>View artist<span className="hidden md:inline"> &amp; music</span></span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" aria-hidden="true">
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
