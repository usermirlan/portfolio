"use client";

import { useEffect, useRef } from "react";

/**
 * Dotted globe: land dots, slow sway around Kyrgyzstan, Osh marked,
 * light arcs flying from Osh to the world. Plain canvas, ~30 fps,
 * pauses off-screen / in background tabs, static with reduced motion.
 */

// 2° land mask, 90 rows (lat 89..-89) × 180 cols (lon -179..179), bit-packed + base64
const MASK = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAfvAAAAAAAAAAAAAAAAAAAAAAAAx37///+AAAAAGoABAAAAAAAAAAAAAIe8P///wAA8AAAAAA0AAAAAAAAAAAwADw////4AAIAAAAAAHAAAAAAAAAAALivwAf//wAAAAADAAP/wAHIAAAAAADsj38AH/+gAAAAAEAH///OAAAAgBgAAfw3/gB/+gAAAgAMHe///+/9gBAP/7/nbdrwD/+AAAH/Ag7H////////8H//////g8H/gAAAf/6//f////////Mf/////9H4D4A+AA+ev///////////AP/////4A0B4AAAD5/////////////Af1////gHgA4AAAP5///////////LwAHgD///gH0AAAAAG4/////////+AMAABAC///4D+AAAAGCx/////////4A4AAAAB////n/gAAAOCR/////////4A4AAAAAf///3/wAAAbH//////////9AgAAAAAP/////gAAADf//////////9AAAAAAAF////0YAAAB///////////8AAAAAAAD////8EAAAB///v///////5AAAAAAAD////+AAAAB/f5f///////wAAAAAAAD////gAAAAfxnwP///////jgAAAAAAD///+AAAAAPCb3///////+AAAAAAAAD///8AAAAAfCJf//////+ECAAAAAAAB///8AAAAAGDRf///////mMAAAAAAAA///8AAAAAH+Ai///////E8AAAAAAAAf//wAAAAAP/AA///////BgAAAAAAAAP//gAAAAAf/73///////gAAAAAAAAAD/AQAAAAAf//9/f/////gAAAAAAAAAF+AQAAAAB///+/n/////AAAAAAAAAAC+AAAAAAB///+fwH///+AAAAAAAAAAAeAwAAAAD////f/D///8gAAAAAAAAAAeGEAAAAD////v+B/j/AAAAAAAAAAAAPMAwAAAD////n+AfB+gAAAAAAAAAAAD8AAAAAD////34AeBfAgAAAAAAAAAAAPAAAAAH////3gAcAfAgAAAAAAAAAAADAAAAAD////6AAcAfgwAAAAAAAAAAABBwAAAD////8wAMATAIAAAAAAAAAAAAr/AAAB/////gAIASAAAAAAAAAAAAAAH/gAAA/////gACAAAIAAAAAAAAAAAAH/8AAAYH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAUOAAAAAAAAAAAAAP/+AAAAB//8AAAAc+gAAAAAAAAAAAAP//gAAAD//4AAAAMeBgAAAAAAAAAAAP//8AAAB//wAAAAGdCuAAAAAAAAAAAf///AAAA//wAAAACAAHgAAAAAAAAAAP///gAAA//wAAAAB4AHggAAAAAAAAAH///AAAAf/wAAAAACIDQIAAAAAAAAAH//+AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//8AAAA//wgAAAAAHxgBAAAAAAAAAA//8AAAA//zgAAAAAf/gAAAAAAAAAAAf/8AAAA//DgAAAAAf/gAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/wAAAAf/DAAAAAH//4AAAAAAAAAAAf/AAAAAf+DAAAAAH//8AAAAAAAAAAAf/AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/8AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/gAAAAAAAAAAAAACAP4AAAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB+AAAAAAAAAAAAAAAAAAAGAAAAAAAAB6AAAAAAAAAAAAAAAAAwAMAAAAAAAAA8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAACAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAA8AAf/8d/AAAAAAAAAAAAkAAAAAAACP/+H//////AAAAAAAAAAA+AAAAIf////+////////AAAAAAAOMKPAAAB///////////////gAAAH/8D//8AAAH//////////////4AAAF/////8AAAP///////////////4AAIf/////gwBwf///////////////4AAAH//////AAD////////////////wAAA///////+f//////////////////A/wH///////////////////////////////////////////////////////////////////////////////////////";

const OSH = { lat: 40.53, lon: 72.8 };
const CITIES = [
  { lat: 42.87, lon: 74.59 },   // Bishkek
  { lat: 55.75, lon: 37.62 },   // Moscow
  { lat: 25.2, lon: 55.27 },    // Dubai
  { lat: 52.52, lon: 13.4 },    // Berlin
  { lat: 51.5, lon: -0.12 },    // London
  { lat: 35.68, lon: 139.69 },  // Tokyo
  { lat: 37.57, lon: 126.98 },  // Seoul
  { lat: 1.35, lon: 103.82 },   // Singapore
];

type V3 = [number, number, number];
const rad = Math.PI / 180;

function toVec(lat: number, lon: number): V3 {
  const la = lat * rad, lo = lon * rad;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s, k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

function buildDots(): V3[] {
  const bin = atob(MASK);
  const isLand = (lat: number, lon: number) => {
    const r = Math.min(89, Math.max(0, Math.round((89 - lat) / 2)));
    const c = Math.min(179, Math.max(0, Math.round((lon + 179) / 2)));
    const i = r * 180 + c;
    return (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  };
  const N = 22000, out: V3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    const lat = Math.asin(y) / rad, lon = Math.atan2(x, z) / rad;
    if (isLand(lat, lon)) out.push([x, y, z]);
  }
  return out;
}

export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = buildDots();
    const osh = toVec(OSH.lat, OSH.lon);
    const targets = CITIES.map((c) => toVec(c.lat, c.lon));
    const tilt = 28 * rad; // looks slightly from above, Central Asia near centre

    let w = 0, h = 0, raf = 0, visible = true, t = 0, last = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const light = document.documentElement.dataset.theme === "light";
      const R = Math.min(w, h) * 0.44;
      const cx = w / 2, cy = h / 2;
      const yaw = (OSH.lon + Math.sin(t * 0.12) * 50 - 8) * rad;
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const ct = Math.cos(tilt), st = Math.sin(tilt);

      const project = (v: V3, lift = 1): [number, number, number] => {
        // yaw around Y (bring lon to the front), then tilt around X
        const x = v[0] * cyw - v[2] * syw;
        const z0 = v[0] * syw + v[2] * cyw;
        const y = v[1] * ct - z0 * st;
        const z = v[1] * st + z0 * ct;
        return [cx + x * R * lift, cy - y * R * lift, z];
      };

      ctx!.clearRect(0, 0, w, h);

      // soft sphere body + rim
      const g = ctx!.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      if (light) { g.addColorStop(0, "rgba(255,255,255,0.9)"); g.addColorStop(1, "rgba(228,228,235,0.55)"); }
      else { g.addColorStop(0, "rgba(40,40,52,0.55)"); g.addColorStop(1, "rgba(14,14,18,0.35)"); }
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.fill();
      ctx!.strokeStyle = light ? "rgba(24,24,27,0.08)" : "rgba(255,255,255,0.08)";
      ctx!.lineWidth = 1; ctx!.stroke();

      // land dots (front hemisphere only)
      const base = light ? "24,24,27" : "228,228,240";
      for (let i = 0; i < dots.length; i++) {
        const p = project(dots[i]);
        if (p[2] <= 0) continue;
        const a = 0.12 + p[2] * (light ? 0.5 : 0.6);
        ctx!.fillStyle = `rgba(${base},${a.toFixed(3)})`;
        const s = 0.9 + p[2] * 1.0;
        ctx!.fillRect(p[0] - s / 2, p[1] - s / 2, s, s);
      }

      // arcs from Osh
      for (let k = 0; k < targets.length; k++) {
        const phase = ((t * 0.18 + k / targets.length) % 1);
        const head = Math.min(1, phase * 1.6);
        const tail = Math.max(0, head - 0.45);
        const steps = 28;
        let prev: [number, number, number] | null = null;
        for (let i = 0; i <= steps; i++) {
          const s = tail + ((head - tail) * i) / steps;
          const v = slerp(osh, targets[k], s);
          const lift = 1 + Math.sin(Math.PI * s) * 0.18;
          const p = project(v, lift);
          if (prev && p[2] > -0.05 && prev[2] > -0.05) {
            const a = (i / steps) * 0.95;
            ctx!.strokeStyle = light ? `rgba(234,88,12,${a})` : `rgba(255,122,77,${a})`;
            ctx!.lineWidth = 1.6;
            ctx!.beginPath(); ctx!.moveTo(prev[0], prev[1]); ctx!.lineTo(p[0], p[1]); ctx!.stroke();
          }
          prev = p;
        }
        // destination dot
        const d = project(targets[k]);
        if (d[2] > 0) {
          ctx!.fillStyle = light ? "rgba(124,58,237,0.85)" : "rgba(196,181,253,0.9)";
          ctx!.beginPath(); ctx!.arc(d[0], d[1], 2.6, 0, Math.PI * 2); ctx!.fill();
        }
      }

      // Osh marker with pulse
      const o = project(osh);
      if (o[2] > 0) {
        const pulse = (t * 0.8) % 1;
        ctx!.strokeStyle = light ? `rgba(234,88,12,${0.6 * (1 - pulse)})` : `rgba(255,122,77,${0.7 * (1 - pulse)})`;
        ctx!.lineWidth = 2;
        ctx!.beginPath(); ctx!.arc(o[0], o[1], 5 + pulse * 18, 0, Math.PI * 2); ctx!.stroke();
        ctx!.fillStyle = light ? "#ea580c" : "#ff7a4d";
        ctx!.beginPath(); ctx!.arc(o[0], o[1], 5, 0, Math.PI * 2); ctx!.fill();
        ctx!.font = "600 13px ui-monospace, monospace";
        ctx!.fillStyle = light ? "rgba(24,24,27,0.85)" : "rgba(244,244,245,0.9)";
        ctx!.fillText("Osh, KG", o[0] + 12, o[1] - 10);
      }
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - last < 33) return;
      last = now;
      t += 0.033;
      draw();
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const mo = new MutationObserver(() => draw());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    t = 2.2;
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="globe pointer-events-none absolute top-[70px] right-[-200px] h-[520px] w-[520px] opacity-40 sm:right-[-140px] sm:opacity-60 lg:top-[30px] lg:right-[-150px] lg:h-[800px] lg:w-[800px] lg:opacity-100"
    />
  );
}
