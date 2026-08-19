import { Reveal } from "../ui/reveal";

const steps = [
  {
    title: "Listen & Learn",
    body: "We spend time understanding your operations before writing a single line of code. The best systems come from knowing the business inside and out.",
  },
  {
    title: "Build & Iterate",
    body: "Ship working software early and refine it with real feedback from the people who use it every day. No six-month surprises.",
  },
  {
    title: "Own & Evolve",
    body: "Your systems grow with you. We maintain, extend, and modernize continuously — because businesses don't stop changing.",
  },
];

/** Three ruled cells, divided rather than spaced — one continuous panel. */
export function ProcessSteps() {
  return (
    <ol className="grid border border-grid md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal
          key={step.title}
          as="li"
          delay={i * 90}
          className={
            i < steps.length - 1
              ? "border-b border-grid md:border-b-0 md:border-r"
              : ""
          }
        >
          <div className="h-full p-7 sm:p-8">
            <p className="label text-phos">
              STEP {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 font-mono text-lg uppercase leading-tight text-fg">
              {step.title}
            </h3>
            <p className="prose-body mt-3 text-fg-dim">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
