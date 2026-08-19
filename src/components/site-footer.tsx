import Link from "next/link";
import { Logo } from "./logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-1 border-t border-grid bg-void">
      <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6">
        {/* Ruled cells, divided by the grid colour — the columns ARE the
            design, so the dividers stay on at rest. */}
        <div className="grid border-x border-grid md:grid-cols-4">
          <div className="border-b border-grid p-8 md:border-b-0 md:border-r">
            <Link href="/" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>
            <p className="mt-5 max-w-56 text-sm leading-relaxed text-fg-dim">
              {site.tagline}
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic">
              <p className="text-fg-faint">
                {site.locality}, {site.regionName}
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-phos transition-colors hover:text-fg"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {footerNav.map((group, i) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className={`border-b border-grid p-8 md:border-b-0 ${
                i < footerNav.length - 1 ? "md:border-r" : ""
              }`}
            >
              <h2 className="label text-fg-faint">
                <span aria-hidden="true" className="text-grid-hi">
                  ##{" "}
                </span>
                {group.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-baseline gap-2 text-sm text-fg-dim transition-colors hover:text-phos"
                    >
                      <span
                        aria-hidden="true"
                        className="text-grid-hi transition-colors group-hover:text-phos"
                      >
                        ›
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="label flex flex-col justify-between gap-2 border-x border-t border-grid px-8 py-5 text-fg-faint sm:flex-row">
          <p>
            © {year} {site.legalName}
          </p>
          <p aria-hidden="true" className="text-grid-hi">
            {"─".repeat(3)} EOF {"─".repeat(3)}
          </p>
        </div>
      </div>
    </footer>
  );
}
