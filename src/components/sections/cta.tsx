import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { Photo } from "../photo";
import clientConversation from "@/images/client-conversation.jpg";
import { site } from "@/lib/site";

export function CtaSection({
  title = "Let's talk about what you're building.",
  body = "We're currently at capacity with existing clients, but we're always interested in hearing about interesting problems. Drop us a line and we'll get back to you when availability opens up.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative z-1 border-t border-line py-20 sm:py-28">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-volt-400"
                />
                <span className="label text-volt-400">Get in touch</span>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">{title}</h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="measure mt-6 text-lg leading-relaxed text-muted">
                {body}
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${site.email}`}
                  variant="ghost"
                  size="lg"
                >
                  {site.email}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <Photo
              src={clientConversation}
              alt="Four colleagues around a café table, one holding a tablet, mid-conversation about a project"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
