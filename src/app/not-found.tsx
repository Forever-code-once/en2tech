import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0"
      />
      <Container size="default" className="relative">
        <div className="flex min-h-[62vh] flex-col justify-center py-24">
          <p className="label text-fg-faint">
            <span aria-hidden="true" className="text-phos">$ </span>
            cd requested/path
          </p>

          <p className="label mt-6 text-alert">
            ! error 404 — no such file or directory
          </p>

          <h1 className="mt-8 text-[clamp(2rem,6vw,4rem)] uppercase">
            That page isn&apos;t here
          </h1>

          <p className="prose-body mt-6 max-w-lg text-fg-dim">
            The link may be out of date, or the page may have moved. Everything
            below still resolves.
          </p>

          <nav aria-label="Suggested pages" className="mt-10">
            <ul className="border border-grid">
              {primaryNav.map((link, i) => (
                <li
                  key={link.href}
                  className={i < primaryNav.length - 1 ? "border-b border-grid" : ""}
                >
                  <Link
                    href={link.href}
                    className="group flex items-baseline gap-3 px-5 py-4 font-mono text-sm transition-colors hover:bg-panel"
                  >
                    <span aria-hidden="true" className="label text-fg-faint transition-colors group-hover:text-phos">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-fg transition-colors group-hover:text-phos">
                      /{link.href.replace("/", "")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" size="lg">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
