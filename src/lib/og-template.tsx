import { formatMarketCap, formatPercentage } from "@/lib/format-tracker";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og-dimensions";

interface OgTrackerStats {
  pqPercentage: number;
  pqMarketCap: number;
  totalMarketCap: number;
}

const colors = {
  void: "#0e0e0e",
  surface: "#181818",
  white: "#ffffff",
  green: "#4ade80",
  content60: "rgba(232, 230, 224, 0.6)",
  content40: "rgba(232, 230, 224, 0.4)",
  borderMed: "rgba(232, 230, 224, 0.16)",
} as const;

export function buildOgElement(stats: OgTrackerStats) {
  const percentage = `${formatPercentage(stats.pqPercentage)}%`;
  const pqMarketCap = formatMarketCap(stats.pqMarketCap);
  const totalMarketCap = formatMarketCap(stats.totalMarketCap);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: OG_WIDTH,
        height: OG_HEIGHT,
        background: colors.void,
        fontFamily: "Geist",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
          color: colors.content60,
        }}
      >
        Post-Quantum Crypto
      </p>
      <h1
        style={{
          margin: "0 0 48px",
          fontSize: 36,
          fontWeight: 500,
          textAlign: "center",
          color: colors.white,
        }}
      >
        Migration Tracker
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 64px",
          border: `1px solid ${colors.borderMed}`,
          borderRadius: 12,
          background: colors.surface,
        }}
      >
        <p
          style={{
            margin: "0 0 16px",
            fontFamily: "Geist Mono",
            fontSize: 72,
            fontWeight: 500,
            textAlign: "center",
            color: colors.green,
            lineHeight: 1,
          }}
        >
          {percentage}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 24,
            textAlign: "center",
            color: colors.content60,
          }}
        >
          <span style={{ color: colors.white }}>{pqMarketCap}</span>
          <span style={{ padding: "0 4px" }}>of</span>
          <span style={{ color: colors.white }}>{totalMarketCap}</span>
          <span style={{ padding: "0 4px" }}>total crypto</span>
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 20,
            textAlign: "center",
            color: colors.content40,
          }}
        >
          market cap is quantum-secure
        </p>
      </div>
    </div>
  );
}
