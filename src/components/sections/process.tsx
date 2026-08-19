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

/** Numbered because the steps genuinely run in sequence. */
export function ProcessSteps() {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.title} as="li" delay={i * 90}>
          <div className="panel panel-lit h-full rounded-2xl p-7 sm:p-8">
            <span className="label inline-flex h-9 w-9 items-center justify-center rounded-full border border-volt-500/40 text-volt-400 tabular-nums">
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-xl leading-tight font-600 text-bright">
              {step.title}
            </h3>
            <p className="mt-3 text-muted">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
