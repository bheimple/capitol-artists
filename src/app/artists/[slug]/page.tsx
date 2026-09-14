import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists, getArtistBySlug } from "@/data/artists";
import { artistMedia } from "@/data/artist-media";
import ArtistMusicPlayer from "@/components/ArtistMusicPlayer";
import { SITE_URL } from "@/lib/site";
import { getArtistPageDetails } from "@/lib/artist-seo";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const { title, description } = getArtistPageDetails(artist);
  const artistUrl = `${SITE_URL}/artists/${artist.slug}`;
  const socialImage = {
    url: `${artistUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${artist.name} — church concert booking with Capitol Artists`,
  };

  return {
    title,
    description,
    alternates: { canonical: artistUrl },
    keywords: [artist.name, artist.genre, "gospel music", "church concert booking", "Capitol Artists"],
    openGraph: {
      title: `${title} | Capitol Artists`,
      description,
      type: "website",
      url: artistUrl,
      siteName: "Capitol Artists",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Capitol Artists`,
      description,
      images: [socialImage],
    },
  };
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

  const { title, description, relatedArtists } = getArtistPageDetails(artist);
  const media = artistMedia[artist.slug];
  const photoWidth = Math.min(552, artist.imageWidth, Math.floor(480 * artist.imageWidth / artist.imageHeight));
  const mobilePhotoWidth = Math.min(artist.imageWidth, Math.floor(320 * artist.imageWidth / artist.imageHeight));
  const artistUrl = `${SITE_URL}/artists/${artist.slug}`;
  const artistId = `${artistUrl}#artist`;
  const pageId = `${artistUrl}#webpage`;
  const imageId = `${artistUrl}#primaryimage`;
  const breadcrumbId = `${artistUrl}#breadcrumb`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": artistId,
        name: artist.name,
        genre: artist.genre,
        description,
        url: artistUrl,
        mainEntityOfPage: { "@id": pageId },
        image: {
          "@type": "ImageObject",
          "@id": imageId,
          url: `${SITE_URL}${artist.image}`,
          contentUrl: `${SITE_URL}${artist.image}`,
          caption: artist.name,
          width: artist.imageWidth,
          height: artist.imageHeight,
        },
        ...(artist.basedIn && { location: artist.basedIn }),
        ...(artist.founded && /^\d{4}$/.test(artist.founded) && { foundingDate: artist.founded }),
        sameAs: [artist.website, ...Object.values(artist.social ?? {})].filter(Boolean),
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: artistUrl,
        name: `${title} | Capitol Artists`,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": artistId },
        primaryImageOfPage: { "@id": imageId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Artist Roster", item: `${SITE_URL}/#roster` },
          { "@type": "ListItem", position: 3, name: artist.name, item: artistUrl },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section aria-labelledby="artist-heading" className="bg-[#062653] text-white pt-24 md:pt-28 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="py-2 text-xs sm:text-sm text-white/85">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-white hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">›</span>
                <Link href="/#roster" className="hover:text-white hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Artist Roster</Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">›</span>
                <span aria-current="page" className="text-white">{artist.name}</span>
              </li>
            </ol>
          </nav>
          <div className="mt-5 grid gap-y-6 text-center md:mt-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:grid-rows-[1fr_1fr] md:gap-x-12 md:text-left lg:gap-x-14">
            <div className="min-w-0 md:col-start-1 md:row-start-1 md:self-end">
              <h1 id="artist-heading" className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                {artist.name}
              </h1>
              <p className="hidden md:block mt-4 text-sm font-semibold leading-relaxed text-[#e7bd69]">
                {artist.genre}
              </p>
            </div>
            <div className="flex min-w-0 items-center justify-center md:col-start-2 md:row-start-1 md:row-span-2">
              <Image
                src={artist.image}
                alt={artist.name}
                width={artist.imageWidth}
                height={artist.imageHeight}
                sizes={`(min-width: 1152px) ${photoWidth}px, (min-width: 768px) 48vw, (max-width: ${mobilePhotoWidth + 48}px) calc(100vw - 48px), ${mobilePhotoWidth}px`}
                loading="eager"
                fetchPriority="high"
                className="block h-auto max-w-full w-[var(--artist-photo-mobile-width)] md:w-[var(--artist-photo-width)]"
                style={{
                  "--artist-photo-mobile-width": `${mobilePhotoWidth}px`,
                  "--artist-photo-width": `${photoWidth}px`,
                } as CSSProperties}
              />
            </div>
            <div className="min-w-0 md:col-start-1 md:row-start-2 md:self-start">
              <p className="max-w-lg mx-auto text-base sm:text-lg leading-relaxed text-[#e2e8f0] [text-wrap:pretty] md:mx-0">
                {artist.shortBio}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
                <Link href={`/?artist=${artist.slug}#contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e7bd69] px-6 py-3.5 text-sm font-bold text-[#062653] hover:bg-[#f0cd87] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Ask About a Concert
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                {media && (
                  <a href="#listen" className="inline-flex min-h-12 items-center gap-2 py-3 text-sm font-medium text-white underline decoration-white/50 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    Listen to Their Music
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {media && (
        <section id="listen" aria-labelledby="listen-heading" className="scroll-mt-24 border-t border-border bg-[#efe0bd] py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[1fr_1.5fr] md:gap-14 lg:px-8">
            <div>
              <h2 id="listen-heading" className="font-serif text-3xl font-bold leading-tight text-[#062653] md:text-4xl [text-wrap:balance]">
                Listen to Their Music
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#364761]">
                Hear {artist.name} before you ask about a concert for your church.
              </p>
              <h3 className="mt-7 font-serif text-2xl font-bold leading-snug text-[#062653]">{media.title}</h3>
              <p className="mt-2 text-sm text-[#364761]">{media.format}</p>
              <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#062653] underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
                More from {artist.name}
              </a>
            </div>
            <ArtistMusicPlayer key={artist.slug} videoId={media.videoId} title={media.title} artistName={artist.name} />
          </div>
        </section>
      )}

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
                    Ask About This Artist
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <Link
                    href="/church-concert-booking"
                    className="mt-4 block text-center text-sm text-accent underline underline-offset-4 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Read the church concert planning guide
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
              {relatedArtists.map((a) => (
                <Link key={a.slug} href={`/artists/${a.slug}`} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:border-accent/40 group-hover:-translate-y-1">
                    <Image src={a.image} alt={a.name} style={{ objectFit: a.imageFit, objectPosition: a.imageFit ? "top" : undefined }} fill sizes="(min-width: 80rem) calc(17.875rem - 2px), (min-width: 64rem) calc(25vw - 2.125rem - 2px), (min-width: 48rem) calc(25vw - 1.875rem - 2px), calc(50vw - 2rem - 2px)" className={`object-cover transition-transform duration-700 ${a.imageFit ? "" : "group-hover:scale-110"}`} />
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
              Interested in Hosting {artist.name}?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              We&apos;d love to hear about your church, its location, and any dates
              you have in mind. Mike can check travel routes and availability
              and help you find a good fit. Churches usually welcome the ministry
              with a love offering and a meal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/?artist=${artist.slug}#contact`}
                className="px-8 py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/20"
              >
                Ask About This Artist
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
