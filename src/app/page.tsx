import Link from "next/link";
import { artists } from "@/data/artists";
import ArtistCard from "@/components/ArtistCard";
import BookingProcess from "@/components/BookingProcess";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Large faded text in background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[20rem] md:text-[28rem] font-serif font-black text-foreground/[0.02] leading-none select-none">
            CA
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
              35+ Years of Gospel Concert Booking
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            Where Faith Meets
            <br />
            <span className="text-gradient-gold">the Stage</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            Capitol Artists connects churches and organizations with the finest
            talent in Southern Gospel and Bluegrass Gospel music. Let us bring
            the concert to you.
          </p>

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

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">35+</div>
              <div className="text-xs text-muted mt-1 tracking-wide">Years Booking</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">{artists.length}</div>
              <div className="text-xs text-muted mt-1 tracking-wide">Touring Artists</div>
            </div>
            <div className="text-center">
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
          {/* Section header */}
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

          {/* Artist grid */}
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
                  country — spreading the Gospel through these wonderful
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

            {/* Decorative panel */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-surface border border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L4 7v6c0 4.5 3.4 8.6 8 9.7 4.6-1.1 8-5.2 8-9.7V7l-8-5z"
                          fill="#d4af37"
                          fillOpacity="0.3"
                        />
                        <path
                          d="M9 11l2 2 4-4"
                          stroke="#d4af37"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl font-serif font-black text-gradient-gold">35+</div>
                      <div className="text-xs text-muted tracking-[0.2em] uppercase">
                        Years of Service
                      </div>
                    </div>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/20 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-accent/20 rounded-br-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
                Book a Concert
              </span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let&apos;s Plan Your Next Concert
            </h2>
            <p className="text-muted max-w-xl mx-auto leading-relaxed">
              Interested in booking one or more of our fine artists? We&apos;d love
              to answer any questions you may have. Fill out the form below or
              reach out directly.
            </p>
          </div>

          {/* Contact form */}
          <form className="bg-surface border border-border rounded-2xl p-6 md:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="john@church.org"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="(719) 260-1151"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                Artist(s) of Interest
              </label>
              <select
                name="artist"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
              >
                <option value="">Select an artist (optional)</option>
                {artists.map((a) => (
                  <option key={a.slug} value={a.name}>
                    {a.name}
                  </option>
                ))}
                <option value="multiple">Multiple Artists</option>
                <option value="not-sure">Not Sure Yet</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-2 tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                placeholder="Tell us about your event, date preferences, venue, etc."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-accent text-background font-semibold hover:bg-accent-hover transition-all hover:shadow-xl hover:shadow-accent/10"
            >
              Submit Inquiry
            </button>
            <p className="text-[11px] text-muted/60 text-center leading-relaxed">
              By providing your phone number, you agree to receive text messages
              from Capitol Artists. You may reply STOP at any time to opt-out.
              Message and data rates may apply. Message frequency varies.
            </p>
          </form>

          {/* Direct contact */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-muted">Prefer to talk directly?</span>
            <a
              href="tel:719-260-1151"
              className="text-accent hover:text-accent-hover transition-colors font-medium"
            >
              📞 719-260-1151
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
