/**
 * Fixed-window rate limiter held in process memory.
 *
 * This is deliberately dependency-free: the site runs as a single Node process
 * on one Lightsail instance, so an in-memory counter is both correct and free.
 * If EN2 ever runs more than one instance behind a load balancer, swap the
 * `hits` Map for Redis — the `check()` signature is designed not to change.
 */

type Window = { count: number; resetAt: number };

const hits = new Map<string, Window>();

/** Drop expired windows so the Map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, window] of hits) {
    if (window.resetAt <= now) hits.delete(key);
  }
}

let lastSweep = 0;
const SWEEP_INTERVAL_MS = 60_000;

export type RateLimitResult = {
  ok: boolean;
  /** Requests left in the current window. */
  remaining: number;
  /** Seconds until the window resets — sent as Retry-After. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (now - lastSweep > SWEEP_INTERVAL_MS) {
    sweep(now);
    lastSweep = now;
  }

  const existing = hits.get(key);

  if (!existing || existing.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }

  return { ok: true, remaining: limit - existing.count, retryAfter };
}

/**
 * Best-effort client IP.
 *
 * Behind nginx/Caddy on Lightsail the real address arrives in X-Forwarded-For,
 * whose left-most entry is the client. We only trust it when
 * TRUST_PROXY_HEADERS is set, so the header cannot be spoofed to evade the
 * limiter if the app is ever exposed directly.
 */
let warnedAboutProxy = false;

export function clientIp(headers: Headers): string {
  if (process.env.TRUST_PROXY_HEADERS !== "true") {
    // Without this, every visitor collapses into the single "unknown" bucket
    // and five submissions would lock out the entire internet for an hour.
    // In production behind nginx/Caddy this is always a misconfiguration.
    if (process.env.NODE_ENV === "production" && !warnedAboutProxy) {
      warnedAboutProxy = true;
      console.warn(
        "[rate-limit] TRUST_PROXY_HEADERS is not 'true'. All requests share one " +
          "rate-limit bucket. Set TRUST_PROXY_HEADERS=true when running behind a " +
          "reverse proxy that sets X-Forwarded-For.",
      );
    }
    return "unknown";
  }

  // Left-most X-Forwarded-For entry is the originating client.
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const real = headers.get("x-real-ip");
  if (real) return real.trim();

  return "unknown";
}
