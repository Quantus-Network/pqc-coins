import type { CoinWithPercentage } from "@/types/coingecko";
import type { PQCoin } from "@/constants/pq-coins";

interface Props {
  coins: CoinWithPercentage[];
  pqCoinsConfig: PQCoin[];
  loading: boolean;
}

function formatMarketCap(value: number | null): string {
  if (value === null) return "N/A";
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

function formatPercentage(value: number): string {
  if (value === 0) {
    return "0";
  }
  if (value < 0.0001) {
    return "<0.0001";
  }
  if (value < 0.01) {
    return value.toFixed(5);
  }
  if (value < 1) {
    return value.toFixed(4);
  }
  return value.toFixed(2);
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-content-10 animate-pulse shrink-0" />
          <div className="h-4 w-20 bg-content-10 rounded animate-pulse" />
        </div>
      </td>
      <td className="py-2.5 px-3">
        <div className="h-4 w-14 bg-content-10 rounded animate-pulse" />
      </td>
      <td className="py-2.5 px-3">
        <div className="h-4 w-16 bg-content-10 rounded animate-pulse" />
      </td>
    </tr>
  );
}

export function CoinTable({ coins, pqCoinsConfig, loading }: Props) {
  const configMap = new Map(pqCoinsConfig.map((c) => [c.id, c]));

  return (
    <section className="py-8">
      <h3 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">
        Quantum-Secure Coins
      </h3>
      <p className="text-content-40 text-sm mb-6">
        Post-quantum cryptography
      </p>

      <div className="rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-med bg-surface">
            <tr>
              <th className="py-2.5 px-3 font-medium text-content-60">
                Coin
              </th>
              <th className="py-2.5 px-3 font-medium text-content-60 text-right">
                MCap
              </th>
              <th className="py-2.5 px-3 font-medium text-content-60 text-right">
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : coins.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-content-60">
                  No data available
                </td>
              </tr>
            ) : (
              coins.map((coin) => {
                const config = configMap.get(coin.id);
                return (
                  <tr
                    key={coin.id}
                    className="border-b border-border last:border-b-0 hover:bg-content-4 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        {coin.image ? (
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-5 h-5 rounded-full shrink-0"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-content-20 shrink-0" />
                        )}
                        <a
                          href={config?.website || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-flare transition-colors font-medium truncate"
                        >
                          {coin.symbol.toUpperCase()}
                        </a>
                        <span className="text-content-40 text-xs truncate hidden sm:inline">
                          {coin.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-content text-right whitespace-nowrap">
                      {formatMarketCap(coin.market_cap)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-green text-right whitespace-nowrap">
                      {formatPercentage(coin.percentageOfTotal)}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="text-content-40 text-xs mt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green" />
        Uses quantum-resistant cryptographic algorithms
      </p>
    </section>
  );
}
