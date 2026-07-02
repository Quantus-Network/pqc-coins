import {
  formatMarketCap,
  formatMarketCapFull,
  formatPercentage,
} from "@/lib/format-tracker";
import type { TrackerData } from "@/types/coingecko";

interface Props {
  data: TrackerData | null;
  loading: boolean;
  error: string | null;
}

export function PercentageHero({ data, loading, error }: Props) {
  const remainingMarketCap = data
    ? data.totalMarketCap - data.pqMarketCap
    : 0;

  return (
    <section className="py-16 text-center px-4">
      <h1 className="text-lg font-medium tracking-wider text-content-60 uppercase mb-2">
        Post-Quantum Crypto
      </h1>
      <h2 className="text-2xl font-medium text-white mb-12">
        Migration Tracker
      </h2>

      <div className="flex justify-center">
        <div className="rounded-lg border border-border-med bg-surface px-6 py-10 md:px-16 md:py-12 text-center">
        {error ? (
          <div className="text-flare text-center">
            <p className="text-lg mb-2">Failed to load data</p>
            <p className="text-sm text-content-60">{error}</p>
          </div>
        ) : loading ? (
          <div className="animate-pulse">
            <div className="h-16 w-48 bg-content-10 rounded mb-4 mx-auto" />
            <div className="h-4 w-64 bg-content-10 rounded mx-auto" />
          </div>
        ) : data ? (
          <>
            <p className="font-mono text-[clamp(1.5rem,5vw,3.75rem)] font-bold text-green mb-2 leading-tight">
              {formatMarketCapFull(remainingMarketCap)}
            </p>
            <p className="text-content-60 text-base mb-6">
              still needs to migrate
            </p>
            <p className="font-mono text-[clamp(2rem,6vw,3.75rem)] font-medium text-flare mb-4 leading-tight">
              {formatPercentage(data.pqPercentage)}%
            </p>
            <p className="text-content-60 text-lg">
              <span className="text-white">{formatMarketCap(data.pqMarketCap)}</span>
              {" "}of{" "}
              <span className="text-white">{formatMarketCap(data.totalMarketCap)}</span>
              {" "}total crypto
            </p>
            <p className="text-content-40 mt-1">
              market cap is quantum-secure
            </p>
          </>
        ) : null}
        </div>
      </div>
    </section>
  );
}
