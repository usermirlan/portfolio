"use client";

import { useEffect, useRef } from "react";

/**
 * Hero weather that follows the theme:
 *  dark  → rain blown by gusting wind + occasional lightning
 *  light → warm sun with slowly turning rays + drifting clouds
 * One canvas, ~30 fps, pauses off-screen / hidden tab.
 * Reduced motion: one still frame, no flashes.
 */

type Drop = { x: number; y: number; len: number; speed: number; alpha: number };
type Cloud = { x: number; y: number; s: number; speed: number; alpha: number };
type Bolt = { pts: [number, number][]; branches: [number, number][][]; life: number };

export default function Weather() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true, last = 0, t = 0;
    let drops: Drop[] = [];
    let clouds: Cloud[] = [];
    let bolt: Bolt | null = null;
    let flash = 0;
    let nextStrike = 4;
    let cloudSprite: HTMLCanvasElement | null = null;

    const isLight = () => document.documentElement.dataset.theme === "light";

    function makeCloudSprite() {
      // one soft cloud drawn once, reused (cheap to blit)
      const c = document.createElement("canvas");
      c.width = 420; c.height = 200;
      const g = c.getContext("2d")!;
      const puffs: [number, number, number][] = [
        [110, 120, 62], [175, 92, 78], [255, 100, 70], [320, 125, 55], [210, 135, 70], [150, 140, 55], [280, 140, 50],
      ];
      for (const [x, y, r] of puffs) {
        const rg = g.createRadialGradient(x, y - r * 0.3, r * 0.2, x, y, r);
        rg.addColorStop(0, "rgba(255,255,255,1)");
        rg.addColorStop(0.7, "rgba(255,255,255,0.92)");
        rg.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = rg;
        g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
      }
      // faint blue-grey belly for depth
      const belly = g.createLinearGradient(0, 110, 0, 190);
      belly.addColorStop(0, "rgba(170,182,210,0.05)");
      belly.addColorStop(1, "rgba(150,165,200,0.55)");
      g.globalCompositeOperation = "source-atop";
      g.fillStyle = belly; g.fillRect(0, 0, 420, 200);
      return c;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(260, (w * h) / 5500));
      drops = Array.from({ length: n }, () => newDrop(true));
      clouds = Array.from({ length: Math.max(4, Math.round(w / 300)) }, (_, i) => ({
        x: (i / Math.max(4, Math.round(w / 300))) * (w + 400) - 200,
        y: 30 + Math.random() * h * 0.38,
        s: 0.4 + Math.random() * 0.5,
        speed: 6 + Math.random() * 10,
        alpha: 0.85 + Math.random() * 0.15,
      }));
    }

    function newDrop(anywhere = false): Drop {
      const z = Math.random(); // depth: far drops are short, slow, faint
      return {
        x: Math.random() * (w + 300) - 150,
        y: anywhere ? Math.random() * h : -20 - Math.random() * 100,
        len: 10 + z * 22,
        speed: 520 + z * 620,
        alpha: 0.12 + z * 0.35,
      };
    }

    function makeBolt(): Bolt {
      const x0 = w * (0.15 + Math.random() * 0.7);
      const pts: [number, number][] = [[x0, -10]];
      let x = x0, y = -10;
      const end = h * (0.45 + Math.random() * 0.35);
      const branches: [number, number][][] = [];
      while (y < end) {
        x += (Math.random() - 0.5) * 46;
        y += 18 + Math.random() * 26;
        pts.push([x, y]);
        if (Math.random() < 0.16) {
          const br: [number, number][] = [[x, y]];
          let bx = x, by = y;
          const dir = Math.random() < 0.5 ? -1 : 1;
          for (let k = 0; k < 4 + Math.random() * 4; k++) {
            bx += dir * (8 + Math.random() * 22); by += 12 + Math.random() * 18;
            br.push([bx, by]);
          }
          branches.push(br);
        }
      }
      return { pts, branches, life: 1 };
    }

    function strokePath(p: [number, number][], width: number, color: string) {
      ctx!.strokeStyle = color; ctx!.lineWidth = width;
      ctx!.beginPath(); ctx!.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < p.length; i++) ctx!.lineTo(p[i][0], p[i][1]);
      ctx!.stroke();
    }

    function drawDark(dt: number) {
      // gusting wind: slant changes slowly, with short gusts
      const wind = Math.sin(t * 0.35) * 0.18 + Math.sin(t * 1.7) * 0.06 + 0.22;
      ctx!.lineCap = "round";
      for (const d of drops) {
        d.y += d.speed * dt;
        d.x += d.speed * wind * dt;
        if (d.y > h + 20 || d.x > w + 160) Object.assign(d, newDrop());
        ctx!.strokeStyle = `rgba(190,205,235,${d.alpha})`;
        ctx!.lineWidth = d.len > 22 ? 1.4 : 1;
        ctx!.beginPath();
        ctx!.moveTo(d.x, d.y);
        ctx!.lineTo(d.x - d.len * wind, d.y - d.len);
        ctx!.stroke();
      }

      if (reduce) return;
      // lightning
      nextStrike -= dt;
      if (nextStrike <= 0) {
        bolt = makeBolt();
        flash = 1;
        nextStrike = 6 + Math.random() * 7;
      }
      if (flash > 0) {
        ctx!.fillStyle = `rgba(200,210,255,${0.10 * flash})`;
        ctx!.fillRect(0, 0, w, h);
        flash = Math.max(0, flash - dt * 2.4);
      }
      if (bolt) {
        const a = bolt.life;
        strokePath(bolt.pts, 7, `rgba(167,139,250,${0.18 * a})`);
        strokePath(bolt.pts, 2.2, `rgba(235,240,255,${0.95 * a})`);
        for (const br of bolt.branches) strokePath(br, 1.2, `rgba(220,225,255,${0.6 * a})`);
        bolt.life -= dt * 3.2;
        if (bolt.life <= 0) bolt = null;
      }
    }

    let sunSprite: HTMLCanvasElement | null = null;
    let sunR = 0;
    function makeSunSprite(R: number) {
      // halo + rays + disc drawn once; each frame only rotates the image
      const S = Math.ceil(R * 9);
      const c = document.createElement("canvas");
      c.width = S; c.height = S;
      const g = c.getContext("2d")!;
      const m = S / 2;
      const halo = g.createRadialGradient(m, m, R * 0.5, m, m, m);
      halo.addColorStop(0, "rgba(255,190,110,0.45)");
      halo.addColorStop(0.3, "rgba(255,170,110,0.14)");
      halo.addColorStop(1, "rgba(255,170,110,0)");
      g.fillStyle = halo; g.fillRect(0, 0, S, S);
      g.translate(m, m);
      for (let i = 0; i < 12; i++) {
        g.rotate((Math.PI * 2) / 12);
        const rg = g.createLinearGradient(0, 0, R * 3.6, 0);
        rg.addColorStop(0, "rgba(255,180,100,0.30)");
        rg.addColorStop(1, "rgba(255,180,100,0)");
        g.fillStyle = rg;
        g.beginPath();
        g.moveTo(R * 1.15, -R * 0.1); g.lineTo(R * 3.6, -R * 0.26); g.lineTo(R * 3.6, R * 0.26); g.lineTo(R * 1.15, R * 0.1);
        g.closePath(); g.fill();
      }
      const core = g.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.1, 0, 0, R);
      core.addColorStop(0, "#fff4da"); core.addColorStop(0.55, "#ffc163"); core.addColorStop(1, "#ff8f45");
      g.fillStyle = core; g.beginPath(); g.arc(0, 0, R, 0, Math.PI * 2); g.fill();
      return c;
    }

    function drawLight(dt: number) {
      const R = Math.max(26, Math.min(44, w * 0.026));
      if (!sunSprite || sunR !== R) { sunSprite = makeSunSprite(R); sunR = R; }
      const sx = w * 0.47, sy = h * 0.115;
      ctx!.save();
      ctx!.translate(sx, sy);
      ctx!.rotate(t * 0.06);
      ctx!.drawImage(sunSprite, -sunSprite.width / 2, -sunSprite.height / 2);
      ctx!.restore();

      if (!cloudSprite) cloudSprite = makeCloudSprite();
      for (const c of clouds) {
        c.x += c.speed * dt;
        const cw = 420 * c.s, ch = 200 * c.s;
        if (c.x > w + 40) { c.x = -cw - Math.random() * 200; c.y = 30 + Math.random() * h * 0.38; }
        ctx!.globalAlpha = c.alpha;
        ctx!.drawImage(cloudSprite, c.x, c.y, cw, ch);
      }
      ctx!.globalAlpha = 1;
    }

    function frame(dt: number) {
      ctx!.clearRect(0, 0, w, h);
      if (isLight()) drawLight(dt); else drawDark(dt);
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) { last = now; return; }
      if (now - last < 33) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.033);
      last = now;
      t += dt;
      frame(dt);
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { resize(); frame(0); });
    ro.observe(canvas);
    const mo = new MutationObserver(() => frame(0));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    frame(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="weather pointer-events-none absolute inset-0 h-full w-full" />;
}
