export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  price_change_percentage_24h: number | null;
  last_updated: string;
}

export interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface TrackerData {
  totalMarketCap: number;
  pqMarketCap: number;
  pqPercentage: number;
  coins: CoinWithPercentage[];
  topCoins: CoinWithPercentage[];
  updatedAt: Date;
}

export interface CoinWithPercentage extends CoinMarketData {
  percentageOfTotal: number;
}

interface TrackerApiResponse extends Omit<TrackerData, "updatedAt"> {
  updatedAt: string;
}

export async function fetchTrackerData(): Promise<TrackerData> {
  const response = await fetch("/api/tracker");
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(
      body.error ?? `Failed to fetch tracker data: ${response.status}`
    );
  }

  const data = (await response.json()) as TrackerApiResponse;
  return {
    ...data,
    updatedAt: new Date(data.updatedAt),
  };
}
