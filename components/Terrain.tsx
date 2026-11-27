"use client";

import { useEffect, useRef } from "react";

/**
 * Animated wireframe mountain range (a nod to Ala-Too).
 * Plain 2D canvas, no libraries. Pauses when off-screen, tab hidden,
 * or when the user prefers reduced motion (then draws one still frame).
 */
export default function Terrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let visible = true;
    let t = 0;
    let mx = 0, tmx = 0; // smoothed mouse x (-1..1)

    const COLS = 80;
    const ROWS = 24;

    function resize() {
      dpr = 1; // lines look fine at 1x and it is ~4x cheaper on retina
      const r = canvas!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function height(x: number, z: number) {
      // ridged sine noise: sharp peaks, soft valleys
      const a = 1 - Math.abs(Math.sin(x * 0.11 + z * 0.09));
      const b = 1 - Math.abs(Math.sin(x * 0.23 - z * 0.17 + 1.7));
      const c = Math.sin(x * 0.05 + z * 0.05) * 0.5 + 0.5;
      const center = 1 - Math.min(1, Math.abs(x) / (COLS * 0.5)) * 0.35;
      return (a * a * 1.6 + b * b * 0.7 + c * 0.9) * center;
    }

    function themeColors() {
      const light = document.documentElement.dataset.theme === "light";
      return light
        ? { near: [234, 88, 12], far: [124, 58, 237], alpha: 0.45 }
        : { near: [255, 122, 77], far: [167, 139, 250], alpha: 0.6 };
    }

    function frame() {
      const { near, far, alpha } = themeColors();
      ctx!.clearRect(0, 0, w, h);
      mx += (tmx - mx) * 0.04;

      const horizon = h * 0.22;
      const f = h * 0.9;          // focal length
      const camH = 3.2;           // camera height
      const zStep = 1;
      const zShift = (t * 0.6) % zStep;

      for (let r = ROWS; r >= 1; r--) {
        const z = r * zStep - zShift + 1.2;
        const depth = r / ROWS; // 0 near … 1 far
        const col = near.map((n, i) => Math.round(n + (far[i] - n) * depth));
        const fade = Math.pow(1 - depth, 1.4) * alpha + 0.04;
        ctx!.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${fade})`;
        ctx!.lineWidth = 1.1 * (1 - depth * 0.6);
        ctx!.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const xw = (c - COLS / 2) * 0.82;
          const hh = height(xw, z + t * 0.6) * 1.7;
          const sx = w / 2 + ((xw - mx * 6) / z) * f * 0.5;
          const sy = horizon + ((camH - hh) / z) * f * 0.5;
          if (c === 0) ctx!.moveTo(sx, sy); else ctx!.lineTo(sx, sy);
        }
        ctx!.stroke();
      }
    }

    let last = 0;
    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - last < 33) return; // ~30 fps is plenty for a slow background
      last = now;
      t += 0.022;
      frame();
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => { tmx = (e.clientX / window.innerWidth) * 2 - 1; };
    const ro = new ResizeObserver(() => { resize(); if (reduce) frame(); });
    ro.observe(canvas);
    const mo = new MutationObserver(() => { if (reduce) frame(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    if (reduce) {
      frame();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="terrain pointer-events-none absolute inset-x-0 bottom-0 h-[52%] w-full" />;
}
