import { PQ_COIN_IDS } from "@/constants/pq-coins";
import { buildTrackerData } from "@/lib/build-tracker-data";
import {
  fetchCoinsMarket,
  fetchGlobalData,
  fetchTopCoins,
} from "@/lib/coingecko-api";
import type { TrackerData } from "@/types/coingecko";

export async function fetchTrackerPayload(apiKey?: string): Promise<TrackerData> {
  const [globalData, coinsData, topCoinsData] = await Promise.all([
    fetchGlobalData(apiKey),
    fetchCoinsMarket(PQ_COIN_IDS, apiKey),
    fetchTopCoins(20, apiKey),
  ]);

  return buildTrackerData(globalData, coinsData, topCoinsData);
}
