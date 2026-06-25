import { fetchTrackerPayload } from "../../src/lib/fetch-tracker-payload";

const CACHE_TTL_SECONDS = 3600;

interface Env {
  COINGECKO_API_KEY?: string;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}) {
  const cache = caches.default;
  const url = new URL(context.request.url);
  const cacheKey = new Request(url.toString(), { method: "GET" });

  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const data = await fetchTrackerPayload(context.env.COINGECKO_API_KEY);

    const response = new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}`,
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch tracker data";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
