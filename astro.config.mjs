// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

/** @param {import('http').IncomingMessage} req */
function isTrackerApiRequest(req) {
  const url = req.url ?? "";
  return url === "/api/tracker" || url.startsWith("/api/tracker?");
}

export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    plugins: [
      {
        name: "tracker-api-dev",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!isTrackerApiRequest(req)) {
              return next();
            }

            try {
              const { fetchTrackerPayload } = await server.ssrLoadModule(
                "/src/lib/fetch-tracker-payload.ts",
              );
              const apiKey = process.env.COINGECKO_API_KEY;
              const data = await fetchTrackerPayload(apiKey);

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            } catch (err) {
              const message =
                err instanceof Error
                  ? err.message
                  : "Failed to fetch tracker data";
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: message }));
            }
          });
        },
      },
    ],
  },
});
