import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { site } from "@/lib/site";

export function CtaSection({
  title = "Let's talk about what you're building.",
  body = "We're currently at capacity with existing clients, but we're always interested in hearing about interesting problems. Drop us a line and we'll get back to you when availability opens up.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t-2 border-forest-800 bg-forest-800 py-20 sm:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_auto] lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-3.5">
                <span aria-hidden="true" className="h-0.5 w-8 bg-clay-500" />
                <span className="label text-clay-500">Get in touch</span>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-6 max-w-3xl text-[clamp(1.875rem,4vw,3rem)] text-paper-100">
                {title}
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="measure mt-5 text-lg leading-relaxed text-paper-400">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={190}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href="/contact"
                size="lg"
                className="border-paper-200 bg-paper-200 text-forest-800 hover:bg-transparent hover:text-paper-200"
              >
                Start a conversation
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}`}
                size="lg"
                className="border-forest-500 bg-transparent text-paper-200 hover:border-paper-200 hover:bg-transparent hover:text-paper-100"
              >
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
