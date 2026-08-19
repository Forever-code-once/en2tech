import { site } from "@/lib/site";

/**
 * Thin availability strip above the header.
 */
export function StatusBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-60 border-b border-line bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-7 w-full max-w-[92rem] items-center justify-between gap-4 px-4 sm:px-8">
        <p className="label flex items-center gap-2.5 text-faint">
          <span className="relative flex h-1.5 w-1.5">
            <span
              aria-hidden="true"
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${
                site.atCapacity ? "bg-flag" : "bg-volt-400"
              }`}
            />
            <span
              aria-hidden="true"
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                site.atCapacity ? "bg-flag" : "bg-volt-400"
              }`}
            />
          </span>
          <span className={site.atCapacity ? "text-flag" : "text-volt-400"}>
            {site.atCapacity ? "Booked full" : "Taking new work"}
          </span>
          <span className="hidden sm:inline">— still worth a conversation</span>
        </p>

        <p className="label hidden text-faint sm:block">
          {site.locality}, {site.region} · Est. {site.founded}
        </p>
      </div>
    </div>
  );
}
