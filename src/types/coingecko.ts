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

// Check for API key - use Pro API if available, otherwise free API
// For Cloudflare Pages, set VITE_COINGECKO_API_KEY in your environment variables
const API_KEY = typeof import.meta !== 'undefined' 
  ? (import.meta as any).env?.VITE_COINGECKO_API_KEY 
  : undefined;

const COINGECKO_BASE_URL = API_KEY
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3";

function getHeaders(): HeadersInit {
  if (API_KEY) {
    return {
      "x-cg-pro-api-key": API_KEY,
    };
  }
  return {};
}

export async function fetchGlobalData(): Promise<GlobalData> {
  const response = await fetch(`${COINGECKO_BASE_URL}/global`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch global data: ${response.status}`);
  }
  return response.json();
}

export async function fetchCoinsMarket(ids: string): Promise<CoinMarketData[]> {
  const response = await fetch(
    `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc`,
    { headers: getHeaders() }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch coins market data: ${response.status}`);
  }
  return response.json();
}

export async function fetchTopCoins(limit: number = 10): Promise<CoinMarketData[]> {
  const response = await fetch(
    `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`,
    { headers: getHeaders() }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch top coins: ${response.status}`);
  }
  return response.json();
}
