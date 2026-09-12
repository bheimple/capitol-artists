import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists, getArtistBySlug } from "@/data/artists";
import { SITE_URL } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((resolvedParams) => {
    const artist = getArtistBySlug(resolvedParams.slug);
    if (!artist) return { title: "Artist Not Found" };
    const artistUrl = `${SITE_URL}/artists/${artist.slug}`;
    return {
      title: artist.name,
      description: artist.shortBio,
      alternates: { canonical: artistUrl },
      keywords: [artist.name, artist.genre, "gospel music", "concert booking", "Capitol Artists", ...(artist.highlights || [])],
      openGraph: {
        title: `${artist.name} | Capitol Artists`,
        description: artist.shortBio,
        type: "profile",
        url: artistUrl,
      },
      twitter: {
        card: "summary_large_image",
        title: `${artist.name} | Capitol Artists`,
        description: artist.shortBio,
      },
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

  const otherArtists = artists.filter((a) => a.slug !== artist.slug).slice(0, 4);
  const photoWidth = Math.min(1024, Math.round(640 * artist.imageWidth / artist.imageHeight));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    genre: artist.genre,
    description: artist.shortBio,
    url: `${SITE_URL}/artists/${artist.slug}`,
    ...(artist.basedIn && { location: artist.basedIn }),
    ...(artist.founded && /^\d{4}$/.test(artist.founded) && { foundingDate: artist.founded }),
    ...(artist.website && { sameAs: [artist.website, ...(artist.social ? Object.values(artist.social).filter(Boolean) : [])] }),
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section aria-labelledby="artist-heading" className="bg-[#062653] text-white pt-28 md:pt-32 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/#roster" className="inline-flex items-center gap-2 py-2 text-sm text-white/85 hover:text-white hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Roster
          </Link>
          <div className="max-w-4xl mx-auto text-center pt-7 md:pt-8">
            <h1 id="artist-heading" className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              {artist.name}
            </h1>
            <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] leading-relaxed text-[#e7bd69]">
              {artist.genre}
            </p>
            <p className="max-w-2xl mx-auto mt-5 text-base sm:text-lg leading-relaxed text-[#e2e8f0] [text-wrap:pretty]">
              {artist.shortBio}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
              <Link href={`/?artist=${artist.slug}#contact`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e7bd69] px-7 py-3.5 text-sm font-bold text-[#062653] hover:bg-[#f0cd87] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Book This Artist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href={artist.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-3 text-sm font-medium text-white underline decoration-white/50 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Visit Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Image
              src={artist.image}
              alt={artist.name}
              width={artist.imageWidth}
              height={artist.imageHeight}
              sizes={`(max-width: ${photoWidth + 48}px) calc(100vw - 48px), ${photoWidth}px`}
              preload
              className="block mx-auto h-auto max-w-full"
              style={{ width: photoWidth }}
            />
          </div>
        </div>
      </section>

      {/* Bio + Stats Layout */}
      <section className="py-20 md:py-28 border-t border-border section-glow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {/* Bio - 2/3 width */}
            <ScrollReveal direction="right" className="md:col-span-2">
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
            </ScrollReveal>

            {/* Stats sidebar - 1/3 width */}
            <ScrollReveal direction="left" delay={200}>
              <div className="sticky top-24 space-y-4">
                {/* Quick Facts Card */}
                <div className="rounded-2xl bg-surface border border-border p-6">
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase mb-5">
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    {artist.genre && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Genre</p>
                          <p className="text-sm font-medium text-foreground">{artist.genre}</p>
                        </div>
                      </div>
                    )}
                    {artist.founded && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Established</p>
                          <p className="text-sm font-medium text-foreground">{artist.founded}</p>
                        </div>
                      </div>
                    )}
                    {artist.basedIn && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Based In</p>
                          <p className="text-sm font-medium text-foreground">{artist.basedIn}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* External link */}
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-all group"
                  >
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors">Official Website</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted group-hover:text-accent transition-colors"><path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  {/* Social links */}
                  {artist.social && (artist.social.facebook || artist.social.youtube || artist.social.instagram) && (
                    <div className="mt-6 flex items-center gap-3">
                      {artist.social.facebook && (
                        <a href={artist.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/50 border border-border backdrop-blur-sm flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all" aria-label="Facebook">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                      )}
                      {artist.social.youtube && (
                        <a href={artist.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/50 border border-border backdrop-blur-sm flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all" aria-label="YouTube">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                      )}
                      {artist.social.instagram && (
                        <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/50 border border-border backdrop-blur-sm flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all" aria-label="Instagram">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Highlights Card */}
                {artist.highlights && artist.highlights.length > 0 && (
                  <div className="rounded-2xl bg-surface border border-border p-6">
                    <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase mb-5">
                      Highlights
                    </h3>
                    <div className="space-y-3">
                      {artist.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-sm text-foreground/90">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking CTA Card */}
                <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 p-6">
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    Want to bring {artist.name} to your church?
                  </p>
                  <Link
                    href={`/?artist=${artist.slug}#contact`}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-accent text-background font-semibold text-sm hover:bg-accent-hover transition-all"
                  >
                    Book a Concert
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* More Artists */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal direction="up">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherArtists.map((a) => (
                <Link key={a.slug} href={`/artists/${a.slug}`} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:border-accent/40 group-hover:-translate-y-1">
                    <Image src={a.image} alt={a.name} style={{ objectFit: a.imageFit, objectPosition: a.imageFit ? "top" : undefined }} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-base font-serif font-bold leading-tight text-white md:mb-2">{a.name}</h3>
                      <span className="hidden md:inline-block max-w-full rounded-md bg-[#062653] px-2 py-1 text-[11px] font-semibold leading-relaxed tracking-[0.06em] uppercase text-white">{a.genre}</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/25 transition-all duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border section-glow">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Interested in Booking {artist.name}?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Let&apos;s talk about bringing {artist.name} to your church or event.
              We handle the details so you can focus on the ministry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/?artist=${artist.slug}#contact`}
                className="px-8 py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/20"
              >
                Book a Concert
              </Link>
              <a
                href="tel:719-260-1151"
                className="px-8 py-4 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-foreground font-semibold text-base hover:bg-surface hover:border-accent/30 transition-all"
              >
                Call 719-260-1151
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
