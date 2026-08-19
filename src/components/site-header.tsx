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
    <header className="fixed inset-x-0 top-7 z-50 border-b-2 border-forest-800 bg-paper-200/97 backdrop-blur-sm">
      <div className="mx-auto flex h-12 w-full max-w-[100rem] items-center justify-between gap-6 px-4 sm:h-16 sm:px-6">
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
                  className={`label relative block px-4 py-2.5 transition-colors duration-150 ${
                    isActive(link.href)
                      ? "text-clay-600"
                      : "text-ink-soft hover:text-forest-800"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-clay-600"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link
                href="/contact"
                className="label block border-2 border-forest-800 bg-forest-800 px-5 py-2.5 text-paper-200 transition-colors duration-150 hover:bg-transparent hover:text-forest-800"
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
          className="label flex items-center gap-2.5 border-2 border-forest-800 px-3.5 py-2.5 text-forest-800 md:hidden"
        >
          <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-150 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile panel — stays mounted so aria-controls always resolves. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t-2 border-forest-800 bg-paper-100 md:hidden"
      >
        {/* Closing on click keeps the panel from lingering over the new page
            without a setState-in-effect on every navigation. */}
        <nav aria-label="Mobile" onClick={() => setOpen(false)}>
          <ul className="flex flex-col">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block border-b border-paper-300 px-4 py-4 font-slab text-lg font-600 transition-colors ${
                    isActive(link.href)
                      ? "bg-paper-50 text-clay-600"
                      : "text-forest-800 hover:bg-paper-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="label block bg-forest-800 px-4 py-4 text-paper-200"
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
