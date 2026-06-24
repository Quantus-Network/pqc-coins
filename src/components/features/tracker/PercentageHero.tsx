import type { TrackerData } from "@/types/coingecko";

interface Props {
  data: TrackerData | null;
  loading: boolean;
  error: string | null;
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

function formatPercentage(value: number): string {
  if (value < 0.0001) {
    return value.toExponential(2);
  }
  if (value < 0.01) {
    return value.toFixed(6);
  }
  if (value < 1) {
    return value.toFixed(4);
  }
  return value.toFixed(2);
}

export function PercentageHero({ data, loading, error }: Props) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-lg font-medium tracking-wider text-content-60 uppercase mb-2">
        Post-Quantum Crypto
      </h1>
      <h2 className="text-2xl font-medium text-white mb-12">
        Migration Tracker
      </h2>

      <div className="inline-block rounded-lg border border-border-med bg-surface px-12 py-10">
        {error ? (
          <div className="text-flare">
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
            <p className="font-mono text-5xl md:text-6xl font-medium text-green mb-4">
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
    </section>
  );
}
