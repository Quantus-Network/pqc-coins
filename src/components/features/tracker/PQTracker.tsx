import { useEffect, useState } from "react";
import { PQ_COINS, PQ_COIN_IDS } from "@/constants/pq-coins";
import {
  fetchGlobalData,
  fetchCoinsMarket,
  fetchTopCoins,
  type TrackerData,
  type CoinWithPercentage,
} from "@/types/coingecko";
import { PercentageHero } from "./PercentageHero";
import { CoinTable } from "./CoinTable";
import { TopCoinsTable } from "./TopCoinsTable";
import { ExplainerSection } from "./ExplainerSection";

export function PQTracker() {
  const [data, setData] = useState<TrackerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [globalData, coinsData, topCoinsData] = await Promise.all([
          fetchGlobalData(),
          fetchCoinsMarket(PQ_COIN_IDS),
          fetchTopCoins(20),
        ]);

        const totalMarketCap = globalData.data.total_market_cap.usd;
        const pqMarketCap = coinsData.reduce(
          (sum, coin) => sum + (coin.market_cap || 0),
          0
        );
        const pqPercentage = (pqMarketCap / totalMarketCap) * 100;

        const coinsWithPercentage: CoinWithPercentage[] = coinsData.map(
          (coin) => ({
            ...coin,
            percentageOfTotal: ((coin.market_cap || 0) / totalMarketCap) * 100,
          })
        );

        const topCoinsWithPercentage: CoinWithPercentage[] = topCoinsData.map(
          (coin) => ({
            ...coin,
            percentageOfTotal: ((coin.market_cap || 0) / totalMarketCap) * 100,
          })
        );

        // Sort by market cap descending
        coinsWithPercentage.sort(
          (a, b) => (b.market_cap || 0) - (a.market_cap || 0)
        );

        setData({
          totalMarketCap,
          pqMarketCap,
          pqPercentage,
          coins: coinsWithPercentage,
          topCoins: topCoinsWithPercentage,
          updatedAt: new Date(),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PercentageHero data={data} loading={loading} error={error} />
      
      <CoinTable
        coins={data?.coins || []}
        pqCoinsConfig={PQ_COINS}
        loading={loading}
      />
      
      <TopCoinsTable
        coins={data?.topCoins || []}
        loading={loading}
      />
      
      <ExplainerSection />
    </div>
  );
}
