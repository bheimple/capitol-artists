import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import ArtistCard from "@/components/ArtistCard";
import BookingProcess from "@/components/BookingProcess";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { CapitolIcon } from "@/components/BrandLogo";
import Psalm150 from "@/components/Psalm150";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Limit the sky crop so the cross and logo remain visible on wide, short screens. */}
      <section aria-labelledby="hero-heading" className="flex flex-col pt-20 md:min-h-[min(100svh,calc(50vw+10rem))] bg-[#f9f6ef]">
        <div className="relative w-full aspect-[2/1] md:aspect-auto md:flex-1 md:min-h-[44vw] md:max-h-[50vw]">
        <Image
          src="/brand/hero-small-logo.webp"
          alt="Capitol Artists tour bus at sunset beneath the Capitol dome and cross logo."
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-bottom"
        />
        <Psalm150 />
        </div>
        <div className="shrink-0 border-y border-[#d8c9a6] px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="max-w-xl text-center md:text-left text-[#062653]">
              <h1 id="hero-heading" className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                Southern Gospel concert booking for churches
              </h1>
              <p className="mt-2 text-sm leading-relaxed">
                Since 1992, Mike has helped churches welcome traveling Southern Gospel and Bluegrass Gospel ministries.
              </p>
            </div>
            <div className="flex flex-col min-[380px]:flex-row w-full md:w-auto gap-3">
              <Link href="#roster" className="px-6 py-3 rounded-full border border-[#062653]/25 text-[#062653] font-semibold text-sm text-center hover:bg-[#062653]/5 transition-colors">Explore the Roster</Link>
              <Link href="#contact" className="px-6 py-3 rounded-full bg-[#062653] text-white font-semibold text-sm text-center hover:bg-[#123d70] transition-colors">Ask About a Concert</Link>
            </div>
          </div>
        </div>
      </section>

    {/* Roster Section */}
    <section id="roster" className="py-24 md:py-32 relative scroll-mt-20 section-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-xs font-semibold tracking-[0.15em] text-[color:var(--accent-dark)] uppercase">
                  The Lineup
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                Our Artist Roster
              </h2>
            </div>
            <p className="text-muted max-w-md text-sm leading-relaxed">
              Meet the Gospel ministries who travel to share Christ through song.
              Mike can help connect your church with a group whose route and
              availability fit.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.slug} artist={artist} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Booking Process Section */}
    <BookingProcess />

    <Testimonials />

    {/* About Section */}
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border section-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-xs font-semibold tracking-[0.15em] text-[color:var(--accent-dark)] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Building Bridges Through Gospel Music Since 1992
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Capitol Artists has been scheduling Gospel concerts and
                  appearances since 1992, dedicated to providing churches
                  and organizations with traveling Southern Gospel and
                  Bluegrass Gospel ministries.
                </p>
                <p>
                  Our ministry mission is building relationships with pastors,
                  conference organizers, and music leaders across the
                  country, spreading the Gospel through these wonderful
                  traveling music ministries, and building up the body of Christ.
                </p>
                <p>
                  Outside of work, Mike is a husband, father, and papa. You will
                  usually find him with his family, on the ice, at a ball game,
                  or at Disneyland!
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Mike Heimple</span>
                  <span className="text-xs text-muted">Founder & Booking Agent</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <a
                  href="tel:719-260-1151"
                  className="text-sm text-[color:var(--accent-dark)] hover:text-accent-hover transition-colors"
                >
                  719-260-1151
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Mike's bio photo */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative flex justify-center md:justify-end">
              <div className="relative max-w-[480px] w-full">
                <div className="aspect-[5/4] rounded-2xl overflow-hidden bg-surface border border-border relative">
                  <Image
                    src="/images/mike-heimple-family-v2.jpg"
                    alt="Mike Heimple, Founder and Booking Agent"
                    fill
                    sizes="(min-width: 1280px) 480px, (min-width: 768px) calc(50vw - 5rem), (min-width: 528px) 480px, calc(100vw - 3rem)"
                    className="object-cover"
                  />
                </div>
                {/* Corner accents */}
                <div className="absolute -top-3 -left-3 w-10 h-10 border-l-2 border-t-2 border-accent/30 rounded-tl-xl" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-r-2 border-b-2 border-accent/30 rounded-br-xl" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <FAQ />

    {/* Contact Section */}
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border section-glow">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-[color:var(--accent-dark)] uppercase">
              Get in Touch
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Host a Gospel Concert
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Tell Mike about your church and where you are located. Share a
            favorite group or date, or let him help you find a ministry that
            fits your church and the artists’ touring plans.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <ContactForm artistOptions={artists.map(({ slug, name }) => ({ slug, name }))} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="mt-10 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <div className="flex items-center gap-3">
              <CapitolIcon size={20} className="text-accent" />
              <span>Capitol Artists</span>
            </div>
            <a href="tel:719-260-1151" className="text-[color:var(--accent-dark)] hover:text-accent-hover transition-colors">
              719-260-1151
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
  );
}
