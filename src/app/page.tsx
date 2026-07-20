import Link from "next/link";
import { artists } from "@/data/artists";
import ArtistCard from "@/components/ArtistCard";
import BookingProcess from "@/components/BookingProcess";
import FAQ from "@/components/FAQ";
import HeroParticles from "@/components/HeroParticles";
import { CapitolIcon } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Gold particle animation */}
      <HeroParticles />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        {/* Capitol icon */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent backdrop-blur-sm">
            <CapitolIcon size={36} />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8 animate-fade-in-up" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
            35+ Years of Gospel Concert Booking
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Where Faith Meets
          <br />
          <span className="text-gradient-gold">the Stage</span>
        </h1>

        {/* Subhead */}
        <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Capitol Artists connects churches and organizations with the finest
          talent in Southern Gospel and Bluegrass Gospel music. Let us bring
          the concert to you.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <Link
            href="#roster"
            className="px-8 py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all hover:shadow-xl hover:shadow-accent/20"
          >
            Explore the Roster
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-foreground font-semibold text-base hover:bg-surface hover:border-accent/30 transition-all"
          >
            Book a Concert
          </Link>
        </div>

        {/* Stats bar with dividers */}
        <div className="mt-20 flex items-center justify-center gap-0 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="text-center px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">35+</div>
            <div className="text-xs text-muted mt-1 tracking-wide">Years Booking</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">{artists.length}</div>
            <div className="text-xs text-muted mt-1 tracking-wide">Touring Artists</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center px-8">
            <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">100s</div>
            <div className="text-xs text-muted mt-1 tracking-wide">Concerts Booked</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>

    {/* Roster Section */}
    <section id="roster" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger">
          {artists.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      </div>
    </section>

    {/* Booking Process Section */}
    <BookingProcess />

    {/* About Section */}
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
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

          {/* Mike's photo */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mike-heimple.jpg"
                alt="Mike Heimple, Founder and Booking Agent"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-accent/30 rounded-tl-xl" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-accent/30 rounded-br-xl" />
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <FAQ />

    {/* Contact Section */}
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Book a Concert
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Let us know if one or more of these fine artists are of interest to
            you. We would love to answer any questions you may have.
          </p>
        </div>

        <form className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="(719) 260-1151"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
              placeholder="Tell us about your event, venue, and which artists you're interested in..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all"
          >
            Submit Inquiry
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-3">
            <CapitolIcon size={20} className="text-accent" />
            <span>Capitol Artists</span>
          </div>
          <a href="tel:719-260-1151" className="text-accent hover:text-accent-hover transition-colors">
            719-260-1151
          </a>
        </div>
      </div>
    </section>
  </div>
  );
}
