import { useEffect, useState } from "react";
import { PQ_COINS } from "@/constants/pq-coins";
import { fetchTrackerData, type TrackerData } from "@/types/coingecko";
import { PercentageHero } from "./PercentageHero";
import { CoinTable } from "./CoinTable";
import { TopCoinsTable } from "./TopCoinsTable";
import { ExplainerSection } from "./ExplainerSection";

export function PQTracker() {
  const [data, setData] = useState<TrackerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setData(await fetchTrackerData());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PercentageHero data={data} loading={loading} error={error} />

      <CoinTable
        coins={data?.coins || []}
        pqCoinsConfig={PQ_COINS}
        loading={loading}
      />

      <TopCoinsTable coins={data?.topCoins || []} loading={loading} />

      <ExplainerSection />
    </div>
  );
}
