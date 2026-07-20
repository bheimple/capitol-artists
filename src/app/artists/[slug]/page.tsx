import { notFound } from "next/navigation";
import Link from "next/link";
import { artists, getArtistBySlug } from "@/data/artists";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((resolvedParams) => {
    const artist = getArtistBySlug(resolvedParams.slug);
    if (!artist) return { title: "Artist Not Found" };
    return {
      title: `${artist.name} | Capitol Artists`,
      description: artist.shortBio,
    };
  });
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  // Get other artists for "More Artists" section
  const otherArtists = artists.filter((a) => a.slug !== artist.slug).slice(0, 4);

  return (
    <div className="relative">
      {/* Hero with artist image and name */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Artist image as background */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          <Link
            href="/#roster"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-muted hover:text-accent transition-colors uppercase mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Roster
          </Link>

          <div className="inline-block px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-6">
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              {artist.genre}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
            {artist.name}
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {artist.shortBio}
          </p>

          {/* Metadata badges */}
          {(artist.basedIn || artist.founded) && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {artist.basedIn && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border backdrop-blur-sm text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {artist.basedIn}
                </div>
              )}
              {artist.founded && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border backdrop-blur-sm text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Established {artist.founded}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-accent text-background font-semibold text-sm hover:bg-accent-hover transition-all"
            >
              Visit Website
            </a>
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-foreground font-semibold text-sm hover:bg-surface hover:border-accent/30 transition-all"
            >
              Book This Artist
            </Link>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              About
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
            The Story
          </h2>
          <div className="space-y-6 text-lg text-muted leading-relaxed">
            {artist.fullBio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Highlights */}
          {artist.highlights && artist.highlights.length > 0 && (
            <div className="mt-12 pt-12 border-t border-border">
              <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase mb-6">
                Highlights
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {artist.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-surface border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/90">{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* More Artists */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                  More from Capitol Artists
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Explore the Roster
              </h2>
            </div>
            <Link
              href="/#roster"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              View All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {otherArtists.map((a) => (
              <Link
                key={a.slug}
                href={`/artists/${a.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-300 group-hover:border-accent/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-accent mb-1">
                      {a.genre}
                    </span>
                    <h3 className="text-base font-serif font-bold leading-tight">
                      {a.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Interested in Booking {artist.name}?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Let&apos;s talk about bringing {artist.name} to your church or event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-4 rounded-full bg-accent text-background font-semibold hover:bg-accent-hover transition-all"
            >
              Book a Concert
            </Link>
            <a
              href="tel:719-260-1151"
              className="px-8 py-4 rounded-full border border-border bg-surface/50 text-foreground font-semibold hover:bg-surface transition-all"
            >
              Call 719-260-1151
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
