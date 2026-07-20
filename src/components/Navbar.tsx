"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#roster", label: "Roster" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Book a Concert" },
];

export function CapitolIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steps/Base */}
      <rect x="6" y="42" width="36" height="3" rx="0.5" fill="currentColor" />
      <rect x="8" y="38" width="32" height="3" rx="0.5" fill="currentColor" />

      {/* Columns */}
      <rect x="12" y="26" width="3" height="11" fill="currentColor" />
      <rect x="18" y="26" width="3" height="11" fill="currentColor" />
      <rect x="27" y="26" width="3" height="11" fill="currentColor" />
      <rect x="33" y="26" width="3" height="11" fill="currentColor" />

      {/* Column base/pediment */}
      <rect x="10" y="23" width="28" height="3" rx="0.5" fill="currentColor" />
      <path d="M10 23 L24 14 L38 23 Z" fill="currentColor" />

      {/* Dome */}
      <path d="M18 14 C18 9, 30 9, 30 14 L30 14 L18 14 Z" fill="currentColor" />
      <rect x="22.5" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <circle cx="24" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-background transition-transform group-hover:scale-105">
            <CapitolIcon size={26} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-foreground">
              CAPITOL
            </span>
            <span className="text-[13px] font-medium tracking-[0.25em] text-accent mt-0.5">
              ARTISTS
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-2 px-5 py-2.5 rounded-full bg-accent text-background text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Book a Concert
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium text-muted hover:text-foreground transition-colors border-b border-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 px-5 py-3 rounded-full bg-accent text-background text-sm font-semibold text-center"
            >
              Book a Concert
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
