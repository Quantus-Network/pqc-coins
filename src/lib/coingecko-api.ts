import type { CoinMarketData, GlobalData } from "@/types/coingecko";

function getBaseUrl(apiKey?: string): string {
  return apiKey
    ? "https://pro-api.coingecko.com/api/v3"
    : "https://api.coingecko.com/api/v3";
}

function getHeaders(apiKey?: string): HeadersInit {
  if (apiKey) {
    return { "x-cg-pro-api-key": apiKey };
  }
  return {};
}

export async function fetchGlobalData(apiKey?: string): Promise<GlobalData> {
  const response = await fetch(`${getBaseUrl(apiKey)}/global`, {
    headers: getHeaders(apiKey),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch global data: ${response.status}`);
  }
  return response.json();
}

export async function fetchCoinsMarket(
  ids: string,
  apiKey?: string
): Promise<CoinMarketData[]> {
  const response = await fetch(
    `${getBaseUrl(apiKey)}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc`,
    { headers: getHeaders(apiKey) }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch coins market data: ${response.status}`);
  }
  return response.json();
}

export async function fetchTopCoins(
  limit: number,
  apiKey?: string
): Promise<CoinMarketData[]> {
  const response = await fetch(
    `${getBaseUrl(apiKey)}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`,
    { headers: getHeaders(apiKey) }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch top coins: ${response.status}`);
  }
  return response.json();
}
