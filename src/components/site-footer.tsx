import Link from "next/link";
import { Logo } from "./logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-1 border-t border-line bg-abyss/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-8">
          <div className="max-w-xs">
            <Link href="/" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <address className="mt-5 space-y-1.5 text-sm not-italic">
              <p className="text-faint">
                {site.locality}, {site.regionName}
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-volt-400 transition-colors hover:text-volt-300"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="label text-faint">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-volt-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="label flex flex-col justify-between gap-2 border-t border-line py-7 text-faint sm:flex-row">
          <p>
            © {year} {site.legalName} · {site.locality}, {site.region}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
