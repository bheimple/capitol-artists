"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction to slide in from: up, left, right, or none */
  direction?: "up" | "left" | "right" | "none";
  /** Only animate once, or re-animate every time it enters viewport */
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof window.IntersectionObserver !== "function" ||
      typeof window.matchMedia !== "function" ||
      typeof el.animate !== "function"
    ) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const startingTransform = {
      up: "translateY(24px)",
      left: "translateX(-24px)",
      right: "translateX(24px)",
      none: "none",
    }[direction];
    let animation: Animation | undefined;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || motionPreference.matches) return;

        animation?.cancel();
        animation = el.animate(
          [
            { opacity: 0.5, transform: startingTransform },
            { opacity: 1, transform: "none" },
          ],
          { duration: 700, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }
        );
        if (once) observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const stopForReducedMotion = () => {
      if (motionPreference.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };
    motionPreference.addEventListener("change", stopForReducedMotion);
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motionPreference.removeEventListener("change", stopForReducedMotion);
    };
  }, [delay, direction, once]);

  // Content is visible before hydration, without JavaScript, and if animation is unsupported.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
