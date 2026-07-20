"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#roster", label: "Roster" },
  { href: "/#about", label: "About" },
  { href: "/calendar", label: "Calendar" },
  { href: "/#faq", label: "FAQ" },
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
      {/* Cross on top */}
      <rect x="22" y="2" width="4" height="14" rx="0.5" fill="currentColor" />
      <rect x="16.5" y="5" width="15" height="4" rx="0.5" fill="currentColor" />

      {/* Steps/Base */}
      <rect x="6" y="42" width="36" height="3" rx="0.5" fill="currentColor" />
      <rect x="8" y="38" width="32" height="3" rx="0.5" fill="currentColor" />

      {/* Columns */}
      <rect x="12" y="26" width="3" height="11" fill="currentColor" />
      <rect x="18" y="26" width="3" height="11" fill="currentColor" />
      <rect x="27" y="26" width="3" height="11" fill="currentColor" />
      <rect x="33" y="26" width="3" height="11" fill="currentColor" />

      {/* Pediment (triangular roof) */}
      <rect x="10" y="23" width="28" height="3" rx="0.5" fill="currentColor" />
      <path d="M10 23 L24 16 L38 23 Z" fill="currentColor" />
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
          <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-background transition-transform group-hover:scale-105">
            <CapitolIcon size={26} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled || mobileOpen ? "text-foreground" : "text-white"}`}>
              CAPITOL
            </span>
            <span className={`text-[13px] font-medium tracking-[0.25em] mt-0.5 transition-colors ${scrolled || mobileOpen ? "text-accent" : "text-accent-light"}`}>
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
              className={`px-4 py-2 text-sm font-medium transition-colors ${scrolled || mobileOpen ? "text-muted hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className={`ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.02] ${scrolled || mobileOpen ? "bg-accent text-background hover:bg-accent-hover" : "bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-md"}`}
          >
            Book a Concert
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 relative z-50 transition-colors ${scrolled || mobileOpen ? "text-foreground" : "text-white"}`}
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
        className={`md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
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
            className={`mt-6 px-6 py-4 rounded-full bg-accent text-background text-base font-semibold text-center transition-all duration-300 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
          >
            Book a Concert
          </Link>

          {/* Contact info at bottom of mobile menu */}
          <div className="mt-auto pt-8 pb-6 border-t border-border">
            <p className="text-sm text-muted mb-2">Questions? Give Mike a call.</p>
            <a
              href="tel:719-260-1151"
              className="text-lg text-accent font-medium"
            >
              719-260-1151
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
