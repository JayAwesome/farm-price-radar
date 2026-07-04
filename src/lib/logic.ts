import { CropData } from "./data";

export interface MarketRecommendation {
  bestCity: string;
  lowestCity: string;
  highestPrice: number;
  lowestPrice: number;
  profitIncrease: string;
  trend: "rising" | "falling" | "stable";
  seasonalSignal: "rising" | "falling" | "stable";
  action: string;
  reason: string;
  confidence: string;
}

export function getPriceTrendStatus(trends: { price: number }[]): "rising" | "falling" | "stable" {
  if (trends.length < 2) return "stable";
  const last = trends[trends.length - 1].price;
  const prev = trends[trends.length - 2].price;

  if (last > prev) return "rising";
  if (last < prev) return "falling";
  return "stable";
}

export function getBestMarket(crop: CropData): MarketRecommendation {
  const sortedPrices = [...crop.prices].sort((a, b) => b.price - a.price);
  const highest = sortedPrices[0];
  const lowest = sortedPrices[sortedPrices.length - 1];

  const profitIncrease = ((highest.price - lowest.price) / lowest.price) * 100;
  const trend = getPriceTrendStatus(crop.trends);

  let action = "";
  let reason = "";

  if (trend === 'rising') {
    action = `Sell in ${highest.city}`;
    reason = `The market is currently rising. Selling now in ${highest.city} capitalizes on the highest current price, which is ${profitIncrease.toFixed(1)}% above the lowest market.`;
  } else if (trend === 'falling') {
    action = `Sell immediately in ${highest.city}`;
    reason = `Prices are falling. To maximize returns, sell now in ${highest.city} before further declines. This secures a ${profitIncrease.toFixed(1)}% higher price compared to the lowest market.`;
  } else { // stable
    if (crop.seasonalSignal === 'rising') {
      action = `Hold for 2-3 weeks`;
      reason = `The market is stable, but seasonal trends suggest prices will rise soon. Holding your stock may lead to better profits as demand increases.`;
    } else {
      action = `Sell in ${highest.city}`;
      reason = `The market is stable. Selling in ${highest.city} is the best option now, offering a ${profitIncrease.toFixed(1)}% profit advantage over ${lowest.city}.`;
    }
  }

  return {
    bestCity: highest.city,
    lowestCity: lowest.city,
    highestPrice: highest.price,
    lowestPrice: lowest.price,
    profitIncrease: profitIncrease.toFixed(1),
    trend,
    seasonalSignal: crop.seasonalSignal,
    action,
    reason,
    confidence: "High Confidence"
  };
}
