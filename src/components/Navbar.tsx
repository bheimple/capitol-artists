"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#roster", label: "Roster" },
  { href: "/church-concert-booking", label: "For Churches" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/artist-representation", label: "For Artists" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={false} className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 lg:px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#062653] text-white hover:bg-[#123d70] transition-colors"
          >
            Ask About a Concert
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 relative z-50 text-[#062653]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-6 relative flex items-center justify-center">
            <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              prefetch={mobileOpen ? null : false}
              className={`py-4 text-2xl font-serif font-bold text-foreground hover:text-accent transition-all duration-300 border-b border-border ${
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            prefetch={mobileOpen ? null : false}
            className={`mt-6 px-6 py-4 rounded-full bg-accent text-background text-base font-semibold text-center transition-all duration-300 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
          >
            Ask About a Concert
          </Link>

          {/* Contact info at bottom of mobile menu */}
          <div className="mt-auto pt-8 pb-6 border-t border-border">
            <p className="text-sm text-muted mb-2">Questions? Give Mike a call.</p>
            <a
              href="tel:719-260-1151"
              className="text-lg text-[color:var(--accent-dark)] font-medium"
            >
              719-260-1151
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
