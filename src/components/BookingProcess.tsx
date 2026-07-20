"use client";

import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Select Your Artist",
    description:
      "Browse our roster, explore schedules, and find the artist whose sound and ministry align with your event's vision.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Secure the Date",
    description:
      "We handle contracts, travel logistics, and staging requirements with full transparency, no surprises, just clear terms.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Promote Your Concert",
    description:
      "Receive promotional toolkits including posters, social media templates, and video promos to help fill your venue.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11l18-5v12L3 14v-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BookingProcess() {
  return (
    <section className="py-24 md:py-32 border-t border-border section-glow relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              How It Works
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            A Seamless Booking Process
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            We make it simple to bring world-class Gospel music to your church
            or venue.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 120} direction="up">
              <div className="relative group h-full">
                {/* Connecting line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-border to-transparent z-20" />
                )}

                <div className="bg-surface border border-border rounded-2xl p-8 h-full transition-all duration-500 hover:border-accent/30 hover:bg-surface-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden">
                  {/* Subtle top glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-500" />

                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-5xl font-serif font-black text-gradient-gold leading-none">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent/10 group-hover:border-accent/20">
                      {step.icon}
                    </div>
                  </div>

                  <div className="w-full h-px bg-border mb-6" />

                  <h3 className="text-xl font-serif font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
