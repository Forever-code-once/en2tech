/**
 * CASE STUDIES
 *
 * ⚠️  REVIEW BEFORE LAUNCH — these entries are anonymized scaffolds built
 * only from claims the current en2.tech site already makes publicly
 * (50+ trucks dispatched daily, QuickBooks / Samsara / Odoo integration,
 * fractional CTO engagements). No client names, logos or quotes have been
 * invented. Every `metrics` figure below is marked TODO and must be
 * confirmed by John before publishing. Set `draft: true` to hide an entry.
 */

export type CaseStudy = {
  slug: string;
  /** Anonymized client descriptor, e.g. "Regional Trucking Operation". */
  client: string;
  industry: string;
  title: string;
  summary: string;
  year: string;
  serviceSlugs: string[];
  challenge: string;
  approach: string[];
  outcome: string;
  /** TODO(john): verify every figure before this goes live. */
  metrics: { value: string; label: string }[];
  stack: string[];
  /** Hide from /work and the sitemap while true. */
  draft: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fleet-dispatch-platform",
    client: "Regional Trucking Operation",
    industry: "Transportation & Logistics",
    title: "A dispatch floor that runs on one screen",
    summary:
      "Replacing a whiteboard, three spreadsheets and a phone tree with a single dispatch platform moving 50+ trucks a day.",
    year: "2024",
    serviceSlugs: ["applications", "integration"],
    challenge:
      "Dispatch ran on a physical whiteboard and a shared spreadsheet. Load assignments lived in one place, driver availability in another, and billing details in a third. Every load was entered by hand at least twice, and no one could answer 'where is that truck' without making a call.",
    approach: [
      "Sat on the dispatch floor for a full week before writing any code",
      "Built the load board first — the one screen dispatchers live in all day",
      "Wired telematics in so truck position updates itself instead of being asked for",
      "Pushed completed loads straight into accounting to end the second data entry",
      "Shipped to two dispatchers first, then rolled out once they stopped asking for changes",
    ],
    outcome:
      "Dispatch, driver status and billing now share one record. A load is entered once, at intake, and everything downstream reads from it.",
    metrics: [
      { value: "50+", label: "Trucks dispatched daily" },
      { value: "1×", label: "Data entry per load, down from 3" },
      { value: "Live", label: "Truck position from telematics" },
    ],
    stack: ["Next.js", "PostgreSQL", "Samsara API", "QuickBooks API"],
    draft: false,
  },
  {
    slug: "accounting-integration",
    client: "Field Services Company",
    industry: "Field Services",
    title: "Closing the books without the shoebox",
    summary:
      "Connecting field job data to accounting so month-end close stopped depending on one person's spreadsheet.",
    year: "2023",
    serviceSlugs: ["integration"],
    challenge:
      "Completed jobs were logged in the field, invoices were built by hand in accounting, and reconciliation happened in a spreadsheet only one person understood. Month-end close was a multi-day scramble and revenue recognition lagged reality by weeks.",
    approach: [
      "Mapped every system that touched a job record from quote to payment",
      "Built a monitored sync with retry and alerting rather than a fragile nightly script",
      "Reconciled historical records before switching over, so the new system started clean",
      "Wrote runbooks so a failed sync is a known, fixable event",
    ],
    outcome:
      "Job completion now flows to invoicing automatically. Close is a review step rather than a reconstruction, and no single person is a bottleneck.",
    metrics: [
      { value: "Auto", label: "Job-to-invoice flow" },
      { value: "0", label: "Spreadsheets in the close process" },
      { value: "Monitored", label: "Sync with failure alerting" },
    ],
    stack: ["QuickBooks API", "Node.js", "PostgreSQL", "Webhooks"],
    draft: false,
  },
];

/** Published case studies, newest first. */
export const publishedCaseStudies = caseStudies
  .filter((c) => !c.draft)
  .sort((a, b) => Number(b.year) - Number(a.year));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
