import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L4 7v6c0 4.5 3.4 8.6 8 9.7 4.6-1.1 8-5.2 8-9.7V7l-8-5z"
                    fill="#0a0a0b"
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
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight">CAPITOL</span>
                <span className="text-xs font-medium tracking-[0.2em] text-accent">
                  ARTISTS
                </span>
              </div>
            </div>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              Connecting churches and organizations with top talent in Southern
              Gospel and Bluegrass Gospel music for over 35 years.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#roster" className="text-sm text-foreground/80 hover:text-accent transition-colors">
                  Artist Roster
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-foreground/80 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-foreground/80 hover:text-accent transition-colors">
                  Book a Concert
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Get in Touch
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">Mike Heimple</p>
              <a
                href="tel:719-260-1151"
                className="text-sm text-accent hover:text-accent-hover transition-colors block"
              >
                719-260-1151
              </a>
              <a
                href="mailto:info@capitol-artists.com"
                className="text-sm text-foreground/80 hover:text-accent transition-colors block"
              >
                info@capitol-artists.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Capitol Artists. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Concert Booking Agency · Southern Gospel &amp; Bluegrass Gospel
          </p>
        </div>
      </div>
    </footer>
  );
}
