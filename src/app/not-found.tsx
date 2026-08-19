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
    <section className="bg-surface">
      <Container size="default">
        <div className="flex min-h-[62vh] flex-col justify-center py-20">
          <p className="label w-fit rounded-full border border-volt-500/50 px-4 py-2 text-volt-400">Error 404</p>

          <h1 className="mt-8 text-[clamp(2rem,5.5vw,3.75rem)]">
            That page isn&apos;t here.
          </h1>

          <p className="measure mt-6 text-lg leading-relaxed text-muted">
            The link may be out of date, or the page may have moved. Everything
            below still works.
          </p>

          <nav aria-label="Suggested pages" className="mt-10 max-w-md">
            <ul className="panel panel-lit rounded-2xl overflow-hidden">
              {primaryNav.map((link, i) => (
                <li
                  key={link.href}
                  className={
                    i < primaryNav.length - 1
                      ? "border-b border-line"
                      : ""
                  }
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-raised/60"
                  >
                    <span className="font-display text-lg font-bold text-bright transition-colors group-hover:text-volt-400">
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="label text-faint transition-all group-hover:translate-x-1 group-hover:text-volt-400"
                    >
                      →
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
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
