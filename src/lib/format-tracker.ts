export function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatPercentage(value: number): string {
  if (value < 0.0001) {
    return value.toExponential(2);
  }
  if (value < 0.01) {
    return value.toFixed(6);
  }
  if (value < 1) {
    return value.toFixed(4);
  }
  return value.toFixed(2);
}
