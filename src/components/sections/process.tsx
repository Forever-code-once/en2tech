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

/**
 * Numbered because the steps genuinely run in order — each depends on the one
 * before it. The numbering is information, not ornament.
 */
export function ProcessSteps() {
  return (
    <ol className="plate grid md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal
          key={step.title}
          as="li"
          delay={i * 90}
          className={
            i < steps.length - 1
              ? "border-b-2 border-forest-800 md:border-b-0 md:border-r-2"
              : ""
          }
        >
          <div className="h-full p-7 sm:p-8">
            <span className="label inline-block bg-clay-600 px-2.5 py-1.5 text-paper-100 tabular-nums">
              Step {i + 1} of {steps.length}
            </span>
            <h3 className="mt-5 font-slab text-xl leading-tight font-bold text-forest-800">
              {step.title}
            </h3>
            <p className="mt-3 text-ink-soft">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
