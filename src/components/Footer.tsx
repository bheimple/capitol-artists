import Link from "next/link";
import { CapitolIcon } from "@/components/Navbar";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Ambient glow at top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-radial from-accent/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand - wider */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-background">
                <CapitolIcon size={26} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tight">CAPITOL</span>
                <span className="text-[13px] font-medium tracking-[0.25em] text-accent mt-0.5">
                  ARTISTS
                </span>
              </div>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Connecting churches and organizations with top talent in Southern
              Gospel and Bluegrass Gospel music for over 35 years.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-muted tracking-wide">EST. 1990</span>
              <span className="w-8 h-px bg-border" />
              <span className="text-xs text-muted tracking-wide">SOUTHERN GOSPEL &amp; BLUEGRASS GOSPEL</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  <span className="group-hover:translate-x-0 transition-transform duration-300" style={{ transform: "translateX(-12px)" }}>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/#roster" className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  <span className="group-hover:translate-x-0 transition-transform duration-300" style={{ transform: "translateX(-12px)" }}>Artist Roster</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  <span className="group-hover:translate-x-0 transition-transform duration-300" style={{ transform: "translateX(-12px)" }}>Our Story</span>
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  <span className="group-hover:translate-x-0 transition-transform duration-300" style={{ transform: "translateX(-12px)" }}>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  <span className="group-hover:translate-x-0 transition-transform duration-300" style={{ transform: "translateX(-12px)" }}>Book a Concert</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground/80">Mike Heimple</p>
                  <a href="tel:719-260-1151" className="text-sm text-accent hover:text-accent-hover transition-colors">
                    719-260-1151
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground/80">Email</p>
                  <a href="mailto:info@capitol-artists.com" className="text-sm text-accent hover:text-accent-hover transition-colors">
                    info@capitol-artists.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CapitolIcon size={16} className="text-muted" />
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Capitol Artists. All rights reserved.
            </p>
          </div>
          <p className="text-xs text-muted tracking-wide">
            Concert Booking Agency · Southern Gospel &amp; Bluegrass Gospel
          </p>
        </div>
      </div>
    </footer>
  );
}
