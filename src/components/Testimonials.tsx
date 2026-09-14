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

  const controlClass = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#062653]/30 text-[#062653] transition-colors hover:bg-[#062653] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]";

  return (
    <section
      ref={section}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-mt-20 border-y border-[#d3bb87] bg-[#efe0bd] px-6 py-14 text-[#062653] md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="testimonials-heading" className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            What Pastors Are Saying
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
              className={`${controlClass} gap-2 px-4 text-sm font-semibold`}
              aria-label={paused ? "Resume rotation" : "Pause rotation"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
              </svg>
              {paused ? "Resume rotation" : "Pause rotation"}
            </button>
          )}
        </div>

        <div
          className="mx-auto mt-9 grid max-w-4xl md:mt-12"
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
                className={`col-start-1 row-start-1 min-w-0 text-center transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${active ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
              >
                <figure>
                  <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl md:text-[1.75rem] md:leading-relaxed [text-wrap:pretty]">
                    <p>&ldquo;{review.excerpt}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 leading-relaxed">
                    <p className="font-semibold">{review.author}{review.role ? ` · ${review.role}` : ""}</p>
                    <p className="mt-1 text-sm text-[#364761]">{review.church}</p>
                    <p className="text-sm text-[#364761]">{review.location}</p>
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
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]"
                >
                  {expanded ? "Close full review" : "Read full review"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d={expanded ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id={`full-review-${review.id}`} hidden={!expanded} className="mx-auto mt-4 max-w-3xl border-t border-[#bba16f] pt-6 text-left">
                  <blockquote className="text-base leading-relaxed text-[#364761] sm:text-lg">
                    <p>{review.quote}</p>
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button type="button" aria-label="Previous review" onClick={() => showReview(activeIndex - 1)} className={controlClass}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
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
                <span aria-hidden="true" style={{ borderColor: "#062653" }} className={`h-3 w-3 rounded-full border ${index === activeIndex ? "bg-[#062653]" : "bg-transparent"}`} />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next review" onClick={() => showReview(activeIndex + 1)} className={controlClass}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="w-full text-center text-sm text-[#364761]">{activeIndex + 1} of {testimonials.length}</span>
        </div>
      </div>
    </section>
  );
}
