import { generateOgImageResponse } from "../../src/lib/generate-og-response";

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
    const response = await generateOgImageResponse(
      context.request.url,
      context.env.COINGECKO_API_KEY,
    );

    const cachedResponse = new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}`,
      },
    });

    context.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    return cachedResponse;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate OG image";
    return new Response(message, { status: 500 });
  }
}
