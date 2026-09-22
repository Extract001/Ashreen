export type ProductFinish = 'emerald' | 'ruby' | 'sapphire' | 'gold';

export interface FinishOption {
  id: ProductFinish;
  name: string;
  colorCode: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  accentColor: string;
  glowColor: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  designNumber?: string;
  tagline: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  longDescription?: string;
  fabric: string;
  craftOrigin: string;
  sizes: string[];
  specs: ProductSpec[];
  finishes: FinishOption[];
  defaultFinish: ProductFinish;
  modelPath?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  accentGradient: string;
}
