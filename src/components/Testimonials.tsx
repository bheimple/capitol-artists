"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { testimonials } from "@/data/testimonials";

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);
  const rotationIntent = useRef<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const pageVisible = useSyncExternalStore(
    subscribeToVisibility,
    () => document.visibilityState === "visible",
    () => false,
  );
  const rotating = !paused && !hovered && !reducedMotion && inView && pageVisible && expandedId === null;

  useEffect(() => {
    if (!section.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: 0.25 },
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 15000);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function showReview(index: number) {
    setPaused(true);
    setExpandedId(null);
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  const controlClass = "inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#062653] text-white transition-colors hover:bg-[#254c7b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]";

  return (
    <section
      ref={section}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-mt-20 bg-[#062653] px-5 py-14 text-[#f8f6f0] sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.85fr_1.65fr] lg:gap-16">
        <header className="flex items-start justify-between gap-4 lg:block lg:pt-10">
          <div>
            <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-[#e8bd68]" />
            <h2 id="testimonials-heading" className="text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              What pastors{" "}<br />
              <span className="text-[#e8bd68]">are saying.</span>
            </h2>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-[#cbd6e4]">
              Stories from the churches we serve.
            </p>
          </div>
          {!reducedMotion && (
            <button
              type="button"
              onPointerDown={() => { rotationIntent.current = !paused; }}
              onPointerCancel={() => { rotationIntent.current = null; }}
              onClick={() => {
                const shouldPause = rotationIntent.current ?? !paused;
                setPaused(shouldPause);
                if (!shouldPause) setExpandedId(null);
                rotationIntent.current = null;
              }}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white/10 px-3 text-sm font-medium text-[#f8f6f0] transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8bd68] sm:px-4 lg:mt-8"
              aria-label={paused ? "Resume rotation" : "Pause rotation"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
              </svg>
              <span className="sr-only sm:not-sr-only">{paused ? "Resume rotation" : "Pause rotation"}</span>
            </button>
          )}
        </header>

        <div className="min-w-0 rounded-3xl bg-[#fbfaf7] p-5 text-[#062653] sm:p-10 lg:p-12">
          <svg width="32" height="25" viewBox="0 0 32 25" fill="currentColor" aria-hidden="true" className="mb-6 text-[#a97c30]">
            <path d="M0 25V14C0 6.5 4.5 1.5 12 0v5c-4.2 1.1-6.5 3.7-6.5 7H13v13H0Zm19 0V14c0-7.5 4.5-12.5 12-14v5c-4.2 1.1-6.5 3.7-6.5 7H32v13H19Z" />
          </svg>
          <div
            className="grid"
            aria-live={rotating ? "off" : "polite"}
            aria-atomic="false"
            onPointerDown={() => setPaused(true)}
          >
            {testimonials.map((review, index) => {
              const active = index === activeIndex;
              const expanded = active && expandedId === review.id;
              return (
                <div
                  key={review.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${review.author}, ${index + 1} of ${testimonials.length}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={`col-start-1 row-start-1 flex min-w-0 flex-col items-start text-left transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${active ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
                >
                  <figure className="flex w-full flex-1 flex-col">
                    <blockquote className="pb-8 text-xl font-medium leading-relaxed tracking-[-0.015em] sm:text-2xl lg:text-[1.75rem] [text-wrap:pretty]">
                      <p>&ldquo;{review.excerpt}&rdquo;</p>
                    </blockquote>
                    <figcaption style={{ borderColor: "#dce1e6" }} className="mt-auto border-t pt-6 leading-relaxed">
                      <p className="font-semibold">{review.author}</p>
                      {review.role && <p className="text-sm text-[#506077]">{review.role}</p>}
                      <p className="mt-1 text-sm text-[#506077]">{review.church}</p>
                      <p className="text-sm text-[#506077]">{review.location}</p>
                    </figcaption>
                  </figure>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`full-review-${review.id}`}
                    onClick={() => {
                      setPaused(true);
                      setExpandedId(expanded ? null : review.id);
                    }}
                    className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-[#a97c30] decoration-2 underline-offset-4 hover:text-[#254c7b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]"
                  >
                    {expanded ? "Close full review" : "Read full review"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d={expanded ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div id={`full-review-${review.id}`} hidden={!expanded} style={{ borderColor: "#dce1e6" }} className="mt-4 w-full border-t pt-6">
                    <blockquote className="text-base leading-relaxed text-[#364761]">
                      <p>{review.quote}</p>
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderColor: "#dce1e6" }} className="mt-6 flex flex-wrap items-center justify-between gap-x-1 gap-y-2 border-t pt-5">
            <div role="group" aria-label="Choose a pastor review" className="flex items-center">
              {testimonials.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Show review from ${review.author}`}
                  aria-disabled={index === activeIndex}
                  onClick={() => { if (index !== activeIndex) showReview(index); }}
                  className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]"
                >
                  <span aria-hidden="true" className={`h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${index === activeIndex ? "w-7 bg-[#062653]" : "w-3 bg-[#78869a]"}`} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="mr-2 hidden text-sm tabular-nums text-[#506077] sm:inline">{activeIndex + 1} / {testimonials.length}</span>
              <button type="button" aria-label="Previous review" onClick={() => showReview(activeIndex - 1)} className={controlClass}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" aria-label="Next review" onClick={() => showReview(activeIndex + 1)} className={controlClass}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
