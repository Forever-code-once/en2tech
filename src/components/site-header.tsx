"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/lib/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock the page, close on Escape, and hand focus back to the toggle so
  // keyboard users are not dumped at the top of the document.
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
    <header className="fixed inset-x-0 top-7 z-50 border-b border-grid bg-void/92 backdrop-blur-sm">
      <div className="mx-auto flex h-12 w-full max-w-[110rem] items-stretch justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex shrink-0 items-center pr-6"
        >
          <Logo />
        </Link>

        {/* Desktop nav. Each item is a ruled cell rather than a pill — the
            divider lines are the design, so they stay visible at rest. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex h-full items-stretch">
            {primaryNav.map((link, i) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`label group relative flex items-center border-l border-grid px-6 transition-colors duration-150 ${
                    isActive(link.href)
                      ? "text-phos"
                      : "text-fg-dim hover:bg-panel hover:text-fg"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="mr-2 text-fg-faint transition-colors group-hover:text-phos"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                  {isActive(link.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-phos"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
            <li className="flex">
              <Link
                href="/contact"
                className="label flex items-center border-l border-grid bg-phos px-6 text-void transition-colors duration-150 hover:bg-fg"
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
          className="label flex items-center gap-2 border-l border-grid pl-5 text-fg-dim md:hidden"
        >
          <span aria-hidden="true" className="text-phos">
            {open ? "[×]" : "[≡]"}
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile panel — stays mounted so aria-controls always resolves. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-grid bg-void md:hidden"
      >
        {/* Closing on click keeps the panel from lingering over the new page
            without a setState-in-effect on every navigation. */}
        <nav aria-label="Mobile" onClick={() => setOpen(false)}>
          <ul className="flex flex-col">
            {primaryNav.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex items-baseline gap-3 border-b border-grid px-4 py-4 font-mono text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-panel text-phos"
                      : "text-fg hover:bg-panel"
                  }`}
                >
                  <span aria-hidden="true" className="label text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="label block bg-phos px-4 py-4 text-void"
              >
                Get in touch →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
