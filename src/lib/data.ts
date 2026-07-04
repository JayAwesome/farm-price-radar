export interface PriceEntry {
  city: string;
  price: number;
}

export interface CropTrend {
  week: string;
  price: number;
}

export interface CropData {
  id: string;
  name: string;
  prices: PriceEntry[];
  trends: CropTrend[];
  seasonalSignal: 'rising' | 'falling' | 'stable';
  unit: string;
}

export const CITIES = ["Abuja", "Lagos", "Kano", "Jos", "Port Harcourt"];

export const CROPS: CropData[] = [
  {
    id: "tomatoes",
    name: "Tomatoes",
    unit: "basket",
    seasonalSignal: 'rising',
    prices: [
      { city: "Abuja", price: 60000 },
      { city: "Lagos", price: 72000 },
      { city: "Kano", price: 58000 },
      { city: "Jos", price: 65000 },
      { city: "Port Harcourt", price: 75000 },
    ],
    trends: [
      { week: "Week 1", price: 55000 },
      { week: "Week 2", price: 58000 },
      { week: "Week 3", price: 62000 },
      { week: "Week 4", price: 60000 },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    unit: "50kg bag",
    seasonalSignal: 'stable',
    prices: [
      { city: "Abuja", price: 85000 },
      { city: "Lagos", price: 92000 },
      { city: "Kano", price: 80000 },
      { city: "Jos", price: 82000 },
      { city: "Port Harcourt", price: 95000 },
    ],
    trends: [
      { week: "Week 1", price: 80000 },
      { week: "Week 2", price: 83000 },
      { week: "Week 3", price: 86000 },
      { week: "Week 4", price: 85000 },
    ],
  },
  {
    id: "maize",
    name: "Maize",
    unit: "100kg bag",
    seasonalSignal: 'rising',
    prices: [
      { city: "Abuja", price: 45000 },
      { city: "Lagos", price: 52000 },
      { city: "Kano", price: 42000 },
      { city: "Jos", price: 44000 },
      { city: "Port Harcourt", price: 55000 },
    ],
    trends: [
      { week: "Week 1", price: 40000 },
      { week: "Week 2", price: 42000 },
      { week: "Week 3", price: 44000 },
      { week: "Week 4", price: 45000 },
    ],
  },
  {
    id: "yam",
    name: "Yam",
    unit: "100 tubers",
    seasonalSignal: 'falling',
    prices: [
      { city: "Abuja", price: 120000 },
      { city: "Lagos", price: 150000 },
      { city: "Kano", price: 110000 },
      { city: "Jos", price: 130000 },
      { city: "Port Harcourt", price: 160000 },
    ],
    trends: [
      { week: "Week 1", price: 110000 },
      { week: "Week 2", price: 115000 },
      { week: "Week 3", price: 125000 },
      { week: "Week 4", price: 120000 },
    ],
  },
  {
    id: "cassava",
    name: "Cassava",
    unit: "ton",
    seasonalSignal: 'stable',
    prices: [
      { city: "Abuja", price: 35000 },
      { city: "Lagos", price: 42000 },
      { city: "Kano", price: 32000 },
      { city: "Jos", price: 34000 },
      { city: "Port Harcourt", price: 45000 },
    ],
    trends: [
      { week: "Week 1", price: 30000 },
      { week: "Week 2", price: 33000 },
      { week: "Week 3", price: 36000 },
      { week: "Week 4", price: 35000 },
    ],
  },
];
