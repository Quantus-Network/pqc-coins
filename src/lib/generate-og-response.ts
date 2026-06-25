import { ImageResponse } from "workers-og";

import { fetchTrackerPayload } from "@/lib/fetch-tracker-payload";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og-dimensions";
import { loadOgFonts } from "@/lib/og-fonts";
import { buildOgElement } from "@/lib/og-template";

export async function generateOgImageResponse(
  requestUrl: string,
  apiKey?: string,
): Promise<Response> {
  const data = await fetchTrackerPayload(apiKey);
  const fonts = await loadOgFonts(requestUrl);
  const element = buildOgElement(data);

  return new ImageResponse(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });
}
