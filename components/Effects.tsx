"use client";

import { useEffect } from "react";

/**
 * One small client island that wires up all page interactions:
 *  - [data-reveal]  fades/slides elements in when they enter the viewport
 *  - [data-count]   counts numbers up from 0 once visible
 *  - [data-tilt]    3D tilt + moving light on pointer hover (desktop only)
 *  - page spotlight that follows the cursor
 */
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("js");

    // reveal
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const countEls = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count && !el.dataset.done) {
            el.dataset.done = "1";
            const target = Number(el.dataset.count);
            if (reduce) { el.textContent = String(target); return; }
            const start = performance.now();
            const dur = 1400;
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = String(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    countEls.forEach((el) => io.observe(el));

    // tilt
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    if (fine && !reduce) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
          el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
          el.style.setProperty("--mx", `${x * 100}%`);
          el.style.setProperty("--my", `${y * 100}%`);
          el.classList.add("tilting");
        };
        const leave = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
          el.classList.remove("tilting");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });

    }

    return () => { io.disconnect(); cleanups.forEach((c) => c()); };
  }, []);

  return null;
}
