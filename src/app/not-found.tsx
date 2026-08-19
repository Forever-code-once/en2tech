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
    <section className="bg-paper-100">
      <Container size="default">
        <div className="flex min-h-[62vh] flex-col justify-center py-20">
          <p className="stamp label w-fit text-clay-600">Error 404</p>

          <h1 className="mt-8 text-[clamp(2rem,5.5vw,3.75rem)]">
            That page isn&apos;t here.
          </h1>

          <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
            The link may be out of date, or the page may have moved. Everything
            below still works.
          </p>

          <nav aria-label="Suggested pages" className="mt-10 max-w-md">
            <ul className="plate">
              {primaryNav.map((link, i) => (
                <li
                  key={link.href}
                  className={
                    i < primaryNav.length - 1
                      ? "border-b border-paper-300"
                      : ""
                  }
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-paper-50"
                  >
                    <span className="font-slab text-lg font-bold text-forest-800 transition-colors group-hover:text-clay-600">
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="label text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-clay-600"
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
