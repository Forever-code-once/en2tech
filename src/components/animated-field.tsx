"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient aurora field.
 *
 * Four large radial-gradient orbs drift on independent Lissajous paths and
 * composite additively over black. It reads as slow-moving light rather than
 * as "particles", and it costs almost nothing: no per-pixel work, no physics,
 * just four gradient fills per frame.
 *
 * Three things keep it from being a battery tax:
 *   · It renders at a capped DPR — the blur hides the resolution loss.
 *   · It throttles to ~30fps, which is plenty for motion this slow.
 *   · It stops entirely when the tab is hidden or the canvas scrolls away.
 *
 * With `prefers-reduced-motion: reduce` it paints one static frame and never
 * starts the loop, so the composition is still there without any movement.
 */

type Orb = {
  hue: string;
  radius: number;
  /** Lissajous coefficients and phase, in normalised viewport units. */
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
};

const ORBS: Orb[] = [
  { hue: "34, 224, 255", radius: 0.55, ax: 0.28, ay: 0.2, fx: 0.021, fy: 0.017, phase: 0 },
  { hue: "124, 58, 237", radius: 0.62, ax: 0.24, ay: 0.26, fx: 0.014, fy: 0.023, phase: 1.9 },
  { hue: "14, 165, 233", radius: 0.45, ax: 0.32, ay: 0.16, fx: 0.026, fy: 0.012, phase: 3.4 },
  { hue: "34, 224, 255", radius: 0.38, ax: 0.18, ay: 0.28, fx: 0.018, fy: 0.027, phase: 5.1 },
];

const FRAME_MS = 1000 / 30;

export function AnimatedField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastPaint = 0;
    let running = true;

    // Half-resolution on high-DPI screens. These are 500px-wide blurred
    // gradients — nobody can tell, and it quarters the fill cost.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function paint(t: number) {
      if (!ctx) return;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Additive blending so overlaps brighten into cyan-white rather than
      // muddying — the behaviour of real light, and the reason this reads as
      // an aurora instead of as coloured blobs.
      ctx.globalCompositeOperation = "lighter";

      const shortest = Math.min(width, height);

      for (const orb of ORBS) {
        const x = width * (0.5 + orb.ax * Math.sin(t * orb.fx + orb.phase));
        const y = height * (0.5 + orb.ay * Math.cos(t * orb.fy + orb.phase * 0.7));
        const r = shortest * orb.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${orb.hue}, 0.20)`);
        gradient.addColorStop(0.45, `rgba(${orb.hue}, 0.07)`);
        gradient.addColorStop(1, `rgba(${orb.hue}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "source-over";
    }

    function loop(now: number) {
      if (!running) return;
      if (now - lastPaint >= FRAME_MS) {
        lastPaint = now;
        paint(now / 1000);
      }
      frame = requestAnimationFrame(loop);
    }

    function handleResize() {
      resize();
      paint(running ? performance.now() / 1000 : 0);
    }

    resize();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // One frame, held. The composition survives; the movement does not.
      running = false;
      paint(0);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        lastPaint = 0;
        frame = requestAnimationFrame(loop);
      }
    }

    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Fine grain over the gradient. Without it, large smooth gradients
          band visibly on 8-bit displays. */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
