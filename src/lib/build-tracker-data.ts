import type {
  CoinMarketData,
  CoinWithPercentage,
  GlobalData,
  TrackerData,
} from "@/types/coingecko";

export function buildTrackerData(
  globalData: GlobalData,
  coinsData: CoinMarketData[],
  topCoinsData: CoinMarketData[]
): TrackerData {
  const totalMarketCap = globalData.data.total_market_cap.usd;
  const pqMarketCap = coinsData.reduce(
    (sum, coin) => sum + (coin.market_cap || 0),
    0
  );
  const pqPercentage = (pqMarketCap / totalMarketCap) * 100;

  const coinsWithPercentage: CoinWithPercentage[] = coinsData.map((coin) => ({
    ...coin,
    percentageOfTotal: ((coin.market_cap || 0) / totalMarketCap) * 100,
  }));

  const topCoinsWithPercentage: CoinWithPercentage[] = topCoinsData.map(
    (coin) => ({
      ...coin,
      percentageOfTotal: ((coin.market_cap || 0) / totalMarketCap) * 100,
    })
  );

  coinsWithPercentage.sort(
    (a, b) => (b.market_cap || 0) - (a.market_cap || 0)
  );

  return {
    totalMarketCap,
    pqMarketCap,
    pqPercentage,
    coins: coinsWithPercentage,
    topCoins: topCoinsWithPercentage,
    updatedAt: new Date(),
  };
}
