import Link from "next/link";

export const metadata = {
  title: "Concert Calendar",
  description: "Upcoming Southern Gospel and Bluegrass Gospel concerts booked through Capitol Artists.",
};

export default function CalendarPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(107, 142, 90, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(107, 142, 90, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Large faded text in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[16rem] md:text-[24rem] font-serif font-black text-foreground/[0.02] leading-none select-none">
          CA
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center py-32">
        {/* Calendar icon */}
        <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
            <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="8" cy="15" r="1" fill="currentColor" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            <circle cx="16" cy="15" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
            In Development
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
          Concert <span className="text-gradient-gold">Calendar</span>
        </h1>

        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed mb-10">
          We are building a live concert calendar so you can see where our
          artists are performing next. Check back soon for upcoming dates,
          venues, and ticket information.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#roster"
            className="px-8 py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all hover:shadow-xl hover:shadow-accent/20"
          >
            Explore the Roster
          </Link>
          <Link
            href="/#contact"
            className="px-8 py-4 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-foreground font-semibold text-base hover:bg-surface hover:border-accent/30 transition-all"
          >
            Book a Concert
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "0s" }} />
          <span className="w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
