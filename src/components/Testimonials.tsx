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
    }, 7000);
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
      className="scroll-mt-20 bg-[#062653] px-5 py-10 text-[#f8f6f0] sm:px-6 md:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex items-center justify-between gap-4">
          <h2 id="testimonials-heading" className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            What pastors <span className="text-[#e8bd68]">are saying.</span>
          </h2>
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
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white/10 px-3 text-sm font-medium text-[#f8f6f0] transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8bd68] sm:px-4"
              aria-label={paused ? "Resume rotation" : "Pause rotation"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
              </svg>
              <span className="sr-only sm:not-sr-only">{paused ? "Resume rotation" : "Pause rotation"}</span>
            </button>
          )}
        </header>

        <div className="min-w-0 rounded-2xl bg-[#fbfaf7] p-5 text-[#062653] sm:p-8">
          <div
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
                  hidden={!active}
                  className={active ? "min-w-0 text-left" : "hidden"}
                >
                  <figure>
                    <blockquote className="text-lg leading-relaxed sm:text-xl [text-wrap:pretty]">
                      <p>&ldquo;{review.excerpt ?? review.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 text-sm leading-relaxed">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        {review.role && <p className="text-[#506077]">{review.role}</p>}
                      </div>
                      <div className="text-[#506077] sm:text-right">
                        <p className="whitespace-pre-line">{review.church}</p>
                        <p>{review.location}</p>
                      </div>
                    </figcaption>
                  </figure>
                  {review.excerpt && (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`full-review-${review.id}`}
                        onClick={() => {
                          setPaused(true);
                          setExpandedId(expanded ? null : review.id);
                        }}
                        className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-[#a97c30] decoration-2 underline-offset-4 hover:text-[#254c7b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]"
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
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ borderColor: "#dce1e6" }} className="mt-3 flex flex-wrap items-center justify-between gap-x-1 gap-y-2 border-t pt-3">
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
