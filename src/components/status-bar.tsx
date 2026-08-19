import { site } from "@/lib/site";

/**
 * Thin fixed strip above the header — the system's "always on" readout.
 * Carries availability, location and a build year, the way a terminal
 * multiplexer keeps a status line pinned to the top of the screen.
 */
export function StatusBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-60 border-b border-grid bg-void">
      <div className="mx-auto flex h-7 w-full max-w-[110rem] items-center justify-between gap-4 px-4 sm:px-6">
        <p className="label flex items-center gap-2 text-fg-faint">
          <span
            aria-hidden="true"
            className={`inline-block h-1.5 w-1.5 ${
              site.atCapacity ? "bg-warn" : "bg-phos"
            }`}
          />
          <span className={site.atCapacity ? "text-warn" : "text-phos"}>
            {site.atCapacity ? "Booked full" : "Taking new work"}
          </span>
          <span aria-hidden="true" className="text-grid-hi">
            {"//"}
          </span>
          <span className="hidden sm:inline">Accepting enquiries</span>
        </p>

        <p className="label flex items-center gap-2 text-fg-faint">
          <span className="hidden sm:inline">
            {site.locality}, {site.region}
          </span>
          <span aria-hidden="true" className="hidden text-grid-hi sm:inline">
            {"//"}
          </span>
          <span>EST. {site.founded}</span>
        </p>
      </div>
    </div>
  );
}
