"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/lib/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // rAF-throttled and passive, so we never do layout reads on the scroll
  // path or block scrolling itself.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-7 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-void/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-[92rem] items-center justify-between gap-6 px-4 sm:h-18 sm:px-8">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-500 transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-volt-400"
                      : "text-muted hover:text-bright"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link
                href="/contact"
                className="block rounded-full bg-volt-400 px-5 py-2.5 text-sm font-600 text-void transition-all duration-200 hover:bg-volt-300 hover:shadow-[0_0_28px_-6px_rgb(34_224_255/0.65)]"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-raised text-bright md:hidden"
        >
          <span aria-hidden="true" className="flex h-3.5 w-5 flex-col justify-between">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel — stays mounted so aria-controls always resolves. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-void/95 backdrop-blur-xl md:hidden"
      >
        {/* Closing on click keeps the panel from lingering over the new page
            without a setState-in-effect on every navigation. */}
        <nav aria-label="Mobile" onClick={() => setOpen(false)} className="p-4">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3.5 font-display text-lg font-500 transition-colors ${
                    isActive(link.href)
                      ? "bg-raised text-volt-400"
                      : "text-bright hover:bg-raised"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/contact"
                className="block rounded-full bg-volt-400 px-5 py-3.5 text-center font-600 text-void"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
