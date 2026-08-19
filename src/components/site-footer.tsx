import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-1 border-t-2 border-forest-800 bg-forest-800 text-paper-200">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6">
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div className="max-w-xs">
            <Link href="/" aria-label={`${site.name} — home`}>
              <span className="inline-flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center bg-paper-200 font-slab text-base leading-none font-bold text-forest-800"
                >
                  E
                </span>
                <span className="font-slab text-xl leading-none font-bold tracking-tight text-paper-100">
                  EN<span className="text-clay-500">2</span>
                  <span className="ml-1.5 text-base font-normal text-paper-400">
                    Tech
                  </span>
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-paper-400">
              {site.tagline}
            </p>

            <address className="mt-5 space-y-1 text-sm not-italic">
              <p className="text-paper-400">
                {site.locality}, {site.regionName}
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper-100 underline decoration-clay-500 decoration-2 underline-offset-4 transition-colors hover:text-clay-500"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="label border-b border-forest-600 pb-3 text-paper-400">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper-200 transition-colors hover:text-clay-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="label flex flex-col justify-between gap-2 border-t border-forest-600 py-6 text-paper-400 sm:flex-row">
          <p>
            © {year} {site.legalName} · {site.locality}, {site.region}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
