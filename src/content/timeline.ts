export type Era = {
  period: string;
  title: string;
  body: string;
};

/** The BBS-to-AI narrative — the core differentiator of the EN2 story. */
export const timeline: Era[] = [
  {
    period: "1980s–90s",
    title: "The BBS Era",
    body: "Dial-up bulletin boards, ANSI graphics, text-based multiplayer worlds. Technology as craft, built one line at a time over a 2400-baud modem.",
  },
  {
    period: "Mid-90s",
    title: "The Online Revolution",
    body: "AOL, the first web browsers, and the sudden reality that every business would eventually need to be online — whether it was ready or not.",
  },
  {
    period: "2000s–2010s",
    title: "Enterprise & Custom Software",
    body: "Full-stack web applications, database-driven business systems, ERP and TMS platforms built from scratch for specific industries.",
  },
  {
    period: "2020s",
    title: "The AI-Augmented Era",
    body: "Orchestrating code and digital media alongside advanced AI. Shipping in weeks what used to take months — with the same hands-on instinct.",
  },
];
