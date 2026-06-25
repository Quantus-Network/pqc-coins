interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: "normal";
}

const FONT_PATHS = [
  { name: "Geist", path: "/fonts/geist-latin-400-normal.woff", weight: 400 },
  { name: "Geist", path: "/fonts/geist-latin-500-normal.woff", weight: 500 },
  {
    name: "Geist Mono",
    path: "/fonts/geist-mono-latin-500-normal.woff",
    weight: 500,
  },
] as const;

let fontsPromise: Promise<OgFont[]> | null = null;

export function loadOgFonts(origin: string): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      FONT_PATHS.map(async ({ name, path, weight }) => {
        const response = await fetch(new URL(path, origin));
        if (!response.ok) {
          throw new Error(`Failed to load font ${path}: ${response.status}`);
        }

        return {
          name,
          data: await response.arrayBuffer(),
          weight,
          style: "normal" as const,
        };
      }),
    );
  }

  return fontsPromise;
}
