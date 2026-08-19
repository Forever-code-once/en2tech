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
    <section className="relative border-t border-grid">
      <Container size="wide">
        <div className="brackets border-x border-grid bg-shell px-6 py-20 sm:py-24">
          <Reveal>
            <p className="label text-fg-faint">
              <span aria-hidden="true" className="text-phos">$ </span>
              contact --open
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="mt-6 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] uppercase">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={130}>
            <p className="prose-body mt-6 max-w-2xl text-fg-dim">{body}</p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Start a conversation
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="ghost" size="lg">
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
