"use client";

import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    quote: "Capitol Artists brought the Adoration Quartet to our church and it was one of the most spirit-filled evenings we have had in years. Mike handled every detail and the congregation is still talking about it.",
    author: "Pastor David Walton",
    church: "First Baptist Church",
    location: "Pueblo, Colorado",
  },
  {
    quote: "Booking through Capitol Artists was effortless. Mike understood our vision, matched us with the right artist, and the love offering exceeded our expectations. A truly blessed evening.",
    author: "Rev. Sarah Mitchell",
    church: "Grace Community Church",
    location: "Fort Worth, Texas",
  },
  {
    quote: "We hosted a multi-artist gospel concert and Mike coordinated everything from travel to sound. The event drew our largest crowd of the year and the ministry impact was felt throughout our community.",
    author: "Pastor James Rutledge",
    church: "Calvary Chapel",
    location: "Knoxville, Tennessee",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 border-t border-border section-glow relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              Voices from the Pews
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            What Hosts Are Saying
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 120} direction="up">
              <div className="relative h-full group">
                <div className="bg-surface border border-border rounded-2xl p-8 h-full transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden">
                  {/* Quote mark accent */}
                  <div className="absolute top-6 right-6 text-6xl font-serif font-black text-accent/10 leading-none select-none">
                    &ldquo;
                  </div>

                  {/* Top glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-500" />

                  <p className="text-sm md:text-base text-muted leading-relaxed mb-8 relative z-10">
                    {t.quote}
                  </p>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-serif font-bold text-sm flex-shrink-0">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.author}</p>
                        <p className="text-xs text-muted">{t.church}, {t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={400} className="mt-12 text-center">
          <p className="text-xs text-muted tracking-wide">
            These are representative testimonials. We would love to add yours.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
