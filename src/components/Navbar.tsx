"use client";

import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const desktopHomeRef = useRef<HTMLAnchorElement>(null);

  function openMenu() {
    menuRef.current?.showModal();
    setMobileOpen(true);
    closeButtonRef.current?.focus();
  }

  function closeMenu() {
    menuRef.current?.close();
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function handleBreakpoint(event: MediaQueryListEvent) {
      if (event.matches && menuRef.current?.open) {
        menuRef.current.close();
        setMobileOpen(false);
        desktopHomeRef.current?.focus({ preventScroll: true });
      }
    }
    desktop.addEventListener("change", handleBreakpoint);
    return () => desktop.removeEventListener("change", handleBreakpoint);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border"
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={false} aria-label="Capitol Artists home" className="flex items-center gap-3 group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              ref={link.href === "/" ? desktopHomeRef : undefined}
              className="px-2.5 lg:px-4 py-3 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="cta-gold cta-compact ml-2"
          >
            Ask About a Concert
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg text-[#062653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]"
          onClick={openMenu}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
        >
          <div aria-hidden="true" className="w-6 h-6 relative flex items-center justify-center">
            <span className="absolute h-0.5 w-6 bg-current -translate-y-1.5" />
            <span className="absolute h-0.5 w-6 bg-current" />
            <span className="absolute h-0.5 w-6 bg-current translate-y-1.5" />
          </div>
        </button>
      </nav>

      {/* Native modality keeps keyboard focus inside the menu and restores it on close. */}
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        aria-label="Navigation menu"
        onClose={() => setMobileOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-background p-0 text-foreground backdrop:bg-[#062653]/30"
      >
        <div className="h-20 px-6 flex items-center justify-between border-b border-border">
          <Link href="/" prefetch={false} onClick={closeMenu} aria-label="Capitol Artists home" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
            <BrandLogo />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#062653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M6 18 18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 pt-5 pb-8">
          <a href="tel:719-260-1151" onClick={closeMenu} className="cta-navy w-full">
            Call Mike <span className="font-normal">719-260-1151</span>
          </a>
          <nav aria-label="Mobile navigation" className="mt-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                prefetch={mobileOpen ? null : false}
                className="py-3 text-xl font-serif font-bold text-foreground hover:text-[#062653] border-b border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            onClick={closeMenu}
            prefetch={mobileOpen ? null : false}
            className="cta-gold w-full mt-6"
          >
            Ask About a Concert
          </Link>
        </div>
      </dialog>
    </header>
  );
}
