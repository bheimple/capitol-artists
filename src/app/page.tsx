import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import ArtistCard from "@/components/ArtistCard";
import BookingProcess from "@/components/BookingProcess";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { CapitolIcon } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with Ken Burns effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover animate-ken-burns origin-center"
          />
          {/* Strong dark overlay so text is always readable */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Extra darkening in the center where text lives */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,0,0,0.35),transparent)]" />
        </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        {/* Capitol icon */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-accent-light backdrop-blur-md">
            <CapitolIcon size={36} />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md mb-8 animate-fade-in-up" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
          <span className="text-xs font-medium tracking-[0.15em] text-white/80 uppercase">
            35+ Years of Gospel Concert Booking
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white animate-fade-in-up [text-shadow:0_2px_20px_rgba(0,0,0,0.8),0_4px_40px_rgba(0,0,0,0.6)]" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Where Faith Meets
          <br />
          <span className="text-gradient-sage-light">the Stage</span>
        </h1>

        {/* Subhead */}
        <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [text-shadow:0_1px_12px_rgba(0,0,0,0.9),0_2px_24px_rgba(0,0,0,0.5)]" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Capitol Artists connects churches and organizations with the finest
          talent in Southern Gospel and Bluegrass Gospel music. Let us bring
          the concert to you.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <Link
            href="#roster"
            className="px-8 py-4 rounded-full bg-accent text-white font-semibold text-base hover:bg-accent-hover transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
          >
            Explore the Roster
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-semibold text-base hover:bg-white/15 hover:border-white/30 transition-all hover:scale-[1.02]"
          >
            Book a Concert
          </Link>
        </div>

        {/* Stats bar with dividers */}
        <div className="mt-20 flex items-center justify-center gap-0 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="text-center px-4 sm:px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-sage-light">35+</div>
            <div className="text-xs text-white/60 mt-1 tracking-wide">Years Booking</div>
          </div>
          <div className="w-px h-12 bg-white/15" />
          <div className="text-center px-4 sm:px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-sage-light">{artists.length}</div>
            <div className="text-xs text-white/60 mt-1 tracking-wide">Touring Artists</div>
          </div>
          <div className="w-px h-12 bg-white/15" />
          <div className="text-center px-4 sm:px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-sage-light">100s</div>
            <div className="text-xs text-white/60 mt-1 tracking-wide">Concerts Booked</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/50 animate-pulse-soft">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent-light to-transparent" />
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
                <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                  The Lineup
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                Our Artist Roster
              </h2>
            </div>
            <p className="text-muted max-w-md text-sm leading-relaxed">
              A carefully curated selection of the finest Southern Gospel and
              Bluegrass Gospel artists, each bringing their own unique sound
              and ministry to the stage.
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

    {/* About Section */}
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border section-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">
                35 Years of Building Bridges Through Gospel Music
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Capitol Artists has been scheduling Gospel concerts and
                  appearances for over 35 years, dedicated to providing churches
                  and organizations with top talent in the Southern Gospel and
                  Bluegrass Gospel music world.
                </p>
                <p>
                  Our ministry mission is building relationships with pastors,
                  conference organizers, and music association leaders across the
                  country, spreading the Gospel through these wonderful
                  traveling music ministries, and building up the body of Christ.
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
                  className="text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  719-260-1151
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Mike's photo - constrained to avoid blurriness */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative flex justify-center md:justify-end">
              <div className="relative max-w-[320px] w-full">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border relative">
                  <Image
                    src="/images/mike-heimple.jpg"
                    alt="Mike Heimple, Founder and Booking Agent"
                    fill
                    sizes="320px"
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

    {/* Testimonials Section */}
    <Testimonials />

    {/* FAQ Section */}
    <FAQ />

    {/* Contact Section */}
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border section-glow">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              Get in Touch
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Book a Concert
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Let us know if one or more of these fine artists are of interest to
            you. We would love to answer any questions you may have.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <ContactForm />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="mt-10 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <div className="flex items-center gap-3">
              <CapitolIcon size={20} className="text-accent" />
              <span>Capitol Artists</span>
            </div>
            <a href="tel:719-260-1151" className="text-accent hover:text-accent-hover transition-colors">
              719-260-1151
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
  );
}
