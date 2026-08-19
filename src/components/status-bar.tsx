import { site } from "@/lib/site";

/**
 * Docket strip above the header — availability, location, and the year the
 * practice opened. Reads as the header block of a service record.
 */
export function StatusBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-60 bg-forest-800 text-paper-200">
      <div className="mx-auto flex h-7 w-full max-w-[100rem] items-center justify-between gap-4 px-4 sm:px-6">
        <p className="label flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`inline-block h-2 w-2 ${
              site.atCapacity ? "bg-clay-500" : "bg-paper-200"
            }`}
          />
          <span>{site.atCapacity ? "Booked full" : "Taking new work"}</span>
          <span aria-hidden="true" className="text-forest-500">
            &bull;
          </span>
          <span className="hidden text-paper-400 sm:inline">
            Accepting enquiries
          </span>
        </p>

        <p className="label flex items-center gap-2.5 text-paper-400">
          <span className="hidden sm:inline">
            {site.locality}, {site.region}
          </span>
          <span aria-hidden="true" className="hidden text-forest-500 sm:inline">
            &bull;
          </span>
          <span>Est. {site.founded}</span>
        </p>
      </div>
    </div>
  );
}
