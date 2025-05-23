export interface Product {
  name: string;
  category: 'stoves' | 'solar' | 'grid' | 'ethanol';
  price: number;
  rating: number;
  tags: string[];
  description: string;
  sale: boolean;
  oldPrice: number | null;
  badge: string | null;
}

export const products: Product[] = [
  {
    name: 'EcoStove Basic',
    category: 'stoves',
    price: 1709,
    rating: 4.5,
    tags: ['Eco-friendly', 'Energy Saving'],
    description: 'Energy-efficient cooking stove perfect for small households.',
    sale: false,
    oldPrice: null,
    badge: null,
  },
  {
    name: 'Solar Power Kit',
    category: 'solar',
    price: 11399,
    rating: 4.8,
    tags: ['Solar', 'Off-grid'],
    description: 'Complete solar power kit for home use with efficient panels and battery backup.',
    sale: true,
    oldPrice: 14249,
    badge: 'SALE',
  },
  {
    name: 'Smart Grid System',
    category: 'grid',
    price: 142499,
    rating: 4.2,
    tags: ['Smart', 'Efficient'],
    description: 'Intelligent energy management system for optimized power distribution.',
    sale: false,
    oldPrice: null,
    badge: null,
  },
  {
    name: 'Eco Fuel',
    category: 'ethanol',
    price: 2849,
    rating: 4.7,
    tags: ['Clean', 'Renewable'],
    description: 'Environmentally friendly fuel made from sustainable sources.',
    sale: true,
    oldPrice: 3419,
    badge: 'SALE',
  },
  {
    name: 'Ethanol Stove Pro',
    category: 'ethanol',
    price: 4559,
    rating: 4.3,
    tags: ['Premium', 'Efficient'],
    description: 'Advanced stove designed specifically for ethanol fuel efficiency.',
    sale: false,
    oldPrice: null,
    badge: null,
  },
]; 