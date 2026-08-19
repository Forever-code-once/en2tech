"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, applied as a CSS transition-delay. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered reveal.
 *
 * Deliberately renders content in its final, visible state on the server and
 * for anyone with `prefers-reduced-motion: reduce`. The hidden starting state
 * is only ever applied once we know JS is running AND motion is welcome, so
 * content can never be trapped at opacity:0 by a failed hydration or a
 * disabled-JS client — the failure mode of the original site's implementation.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOk || typeof IntersectionObserver === "undefined") return;

    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount should not flash in.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setAnimate(true);
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    setAnimate(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${animate ? "reveal" : ""} ${className}`.trim()}
      data-visible={visible ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
