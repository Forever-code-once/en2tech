export type Service = {
  slug: string;
  title: string;
  tagline: string;
  /** Long-form description used on the services page. */
  body: string;
  /** Concrete deliverables — what the client actually receives. */
  deliverables: string[];
  /** Named tools/platforms, shown as a stack strip. */
  stack: string[];
  /** Signals that a business is ready for this service. */
  fitFor: string[];
};

export const services: Service[] = [
  {
    slug: "applications",
    title: "Custom Business Applications",
    tagline: "Software shaped to your operation, not the other way around.",
    body: "Off-the-shelf software forces your team to work the way a vendor imagined. We do the opposite: we watch how your business actually runs, then build the application around it. Transportation management, service dispatch, project tracking, billing dashboards — full-stack web applications your people open every morning and never think twice about.",
    deliverables: [
      "Discovery and workflow mapping with the people doing the work",
      "A working application deployed to your team, not a prototype",
      "Role-based access for office staff, drivers, and management",
      "Reporting and dashboards built on your real operational data",
      "Documentation and training for the staff who use it daily",
    ],
    stack: ["TypeScript", "React", "Next.js", "PostgreSQL", "Node.js"],
    fitFor: [
      "You are running critical operations out of spreadsheets",
      "Your team has invented manual workarounds for the software you bought",
      "You need something no vendor sells because your process is your edge",
    ],
  },
  {
    slug: "integration",
    title: "Systems Integration",
    tagline: "Make the software you already pay for talk to itself.",
    body: "Most small businesses do not have a software problem — they have a translation problem. Accounting is in one system, telematics in another, the field crew is on a third, and somebody re-keys the same data three times a day. We connect those systems so information moves once, correctly, and automatically.",
    deliverables: [
      "An audit of every system currently holding your business data",
      "Reliable, monitored sync jobs with retry and failure alerting",
      "Elimination of duplicate manual data entry between systems",
      "A single reconciled view of jobs, invoices, and assets",
      "Runbooks so a failed sync is a known problem, not a mystery",
    ],
    stack: ["QuickBooks", "Samsara", "Odoo", "REST & Webhooks", "Postgres"],
    fitFor: [
      "The same record gets typed into two systems every day",
      "Your month-end close depends on someone's personal spreadsheet",
      "You have bought good tools that refuse to speak to each other",
    ],
  },
  {
    slug: "strategy",
    title: "Technology Strategy",
    tagline: "Fractional CTO for companies that outgrew spreadsheets.",
    body: "You do not need a full-time CTO. You do need someone who can tell you whether that quote is reasonable, whether that platform will still fit in three years, and what to build versus buy. We sit on your side of the table — evaluating vendors, planning the roadmap, and making the calls that are expensive to get wrong.",
    deliverables: [
      "A written technology roadmap tied to your growth plan",
      "Vendor and platform evaluation with an honest build-vs-buy call",
      "Budget forecasting for licensing, infrastructure, and headcount",
      "Security, backup, and continuity review",
      "A standing seat in your planning conversations",
    ],
    stack: ["Roadmapping", "Vendor Review", "Architecture", "Budget Planning"],
    fitFor: [
      "You are being sold a platform and have no way to judge the pitch",
      "Technology decisions are being made by whoever is least busy",
      "Growth is about to break the systems that got you here",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
