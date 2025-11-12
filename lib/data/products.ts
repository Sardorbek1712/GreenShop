/**
 * Mock product data for GreenShop
 * In production, this would come from an API or database
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number; // If present, product is on discount
  tags: string[];
  addedDate: string; // ISO date string
  bestSeller?: boolean;
  mostCommon?: boolean;
  category: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Red Rose Bouquet',
    slug: 'red-rose-bouquet',
    description: 'Classic red roses arranged beautifully. Perfect for expressing love and romance. Each bouquet contains 12 premium long-stem roses.',
    price: 49.99,
    originalPrice: 69.99,
    tags: ['roses', 'romantic', 'classic'],
    addedDate: '2024-11-10T00:00:00Z',
    bestSeller: true,
    category: 'Roses',
    stock: 25,
  },
  {
    id: '2',
    name: 'Sunflower Delight',
    slug: 'sunflower-delight',
    description: 'Bright and cheerful sunflowers that bring sunshine to any room. Includes 6 large sunflower blooms with complementary greenery.',
    price: 39.99,
    tags: ['sunflower', 'bright', 'cheerful'],
    addedDate: '2024-11-09T00:00:00Z',
    mostCommon: true,
    category: 'Sunflowers',
    stock: 30,
  },
  {
    id: '3',
    name: 'Lavender Dreams',
    slug: 'lavender-dreams',
    description: 'Soothing lavender bouquet with a calming fragrance. Includes dried lavender bundles that last for months.',
    price: 34.99,
    originalPrice: 44.99,
    tags: ['lavender', 'calming', 'fragrant'],
    addedDate: '2024-11-08T00:00:00Z',
    category: 'Lavender',
    stock: 20,
  },
  {
    id: '4',
    name: 'Tulip Paradise',
    slug: 'tulip-paradise',
    description: 'Vibrant mixed tulips in spring colors. Perfect for adding a touch of elegance to your home. Contains 15 assorted tulips.',
    price: 44.99,
    tags: ['tulips', 'colorful', 'spring'],
    addedDate: '2024-11-07T00:00:00Z',
    bestSeller: true,
    mostCommon: true,
    category: 'Tulips',
    stock: 18,
  },
  {
    id: '5',
    name: 'White Orchid Elegance',
    slug: 'white-orchid-elegance',
    description: 'Sophisticated white orchids in decorative pot. Long-lasting and low maintenance. Perfect for offices and homes.',
    price: 79.99,
    originalPrice: 99.99,
    tags: ['orchids', 'elegant', 'long-lasting'],
    addedDate: '2024-11-12T00:00:00Z',
    bestSeller: true,
    category: 'Orchids',
    stock: 12,
  },
  {
    id: '6',
    name: 'Daisy Chain',
    slug: 'daisy-chain',
    description: 'Charming white daisies arranged in a rustic style. Brings a cottage garden feel to any space.',
    price: 29.99,
    tags: ['daisies', 'rustic', 'charming'],
    addedDate: '2024-11-06T00:00:00Z',
    mostCommon: true,
    category: 'Daisies',
    stock: 35,
  },
  {
    id: '7',
    name: 'Peony Perfection',
    slug: 'peony-perfection',
    description: 'Luxurious pink peonies in full bloom. These stunning flowers are perfect for special occasions.',
    price: 64.99,
    originalPrice: 84.99,
    tags: ['peonies', 'luxurious', 'pink'],
    addedDate: '2024-11-11T00:00:00Z',
    category: 'Peonies',
    stock: 10,
  },
  {
    id: '8',
    name: 'Hydrangea Haven',
    slug: 'hydrangea-haven',
    description: 'Stunning blue hydrangeas that make a bold statement. Perfect for both modern and traditional settings.',
    price: 54.99,
    tags: ['hydrangeas', 'blue', 'statement'],
    addedDate: '2024-11-05T00:00:00Z',
    bestSeller: true,
    category: 'Hydrangeas',
    stock: 15,
  },
  {
    id: '9',
    name: 'Lily Luxury',
    slug: 'lily-luxury',
    description: 'Elegant white lilies with a sweet fragrance. Symbolizes purity and sophistication.',
    price: 59.99,
    tags: ['lilies', 'elegant', 'fragrant'],
    addedDate: '2024-11-04T00:00:00Z',
    mostCommon: true,
    category: 'Lilies',
    stock: 22,
  },
  {
    id: '10',
    name: 'Carnation Celebration',
    slug: 'carnation-celebration',
    description: 'Colorful mixed carnations perfect for celebrations. Long-lasting and vibrant.',
    price: 24.99,
    originalPrice: 34.99,
    tags: ['carnations', 'colorful', 'celebration'],
    addedDate: '2024-11-03T00:00:00Z',
    category: 'Carnations',
    stock: 40,
  },
  {
    id: '11',
    name: 'Gerbera Joy',
    slug: 'gerbera-joy',
    description: 'Cheerful gerbera daisies in bright colors. Guaranteed to brighten anyone\'s day.',
    price: 37.99,
    tags: ['gerberas', 'cheerful', 'colorful'],
    addedDate: '2024-11-02T00:00:00Z',
    mostCommon: true,
    category: 'Gerberas',
    stock: 28,
  },
  {
    id: '12',
    name: 'Iris Collection',
    slug: 'iris-collection',
    description: 'Beautiful purple iris flowers that add sophistication. Known for their unique shape and vibrant color.',
    price: 42.99,
    tags: ['iris', 'purple', 'unique'],
    addedDate: '2024-11-01T00:00:00Z',
    category: 'Iris',
    stock: 20,
  },
  {
    id: '13',
    name: 'Mixed Spring Bouquet',
    slug: 'mixed-spring-bouquet',
    description: 'A delightful mix of seasonal spring flowers. Each bouquet is uniquely arranged by our expert florists.',
    price: 54.99,
    originalPrice: 69.99,
    tags: ['mixed', 'spring', 'seasonal'],
    addedDate: '2024-10-30T00:00:00Z',
    bestSeller: true,
    category: 'Mixed',
    stock: 16,
  },
  {
    id: '14',
    name: 'Chrysanthemum Beauty',
    slug: 'chrysanthemum-beauty',
    description: 'Gorgeous chrysanthemums in warm autumn tones. Perfect for fall decorations.',
    price: 32.99,
    tags: ['chrysanthemums', 'autumn', 'warm'],
    addedDate: '2024-10-29T00:00:00Z',
    category: 'Chrysanthemums',
    stock: 25,
  },
  {
    id: '15',
    name: 'Ranunculus Romance',
    slug: 'ranunculus-romance',
    description: 'Delicate ranunculus flowers in soft pastel shades. Perfect for romantic occasions.',
    price: 47.99,
    tags: ['ranunculus', 'romantic', 'pastel'],
    addedDate: '2024-10-28T00:00:00Z',
    category: 'Ranunculus',
    stock: 14,
  },
  {
    id: '16',
    name: 'Anemone Arrangement',
    slug: 'anemone-arrangement',
    description: 'Striking black and white anemones for a modern look. Bold and beautiful.',
    price: 52.99,
    originalPrice: 67.99,
    tags: ['anemones', 'modern', 'bold'],
    addedDate: '2024-10-27T00:00:00Z',
    category: 'Anemones',
    stock: 12,
  },
  {
    id: '17',
    name: 'Baby\'s Breath Bundle',
    slug: 'babys-breath-bundle',
    description: 'Delicate white baby\'s breath perfect for adding to any arrangement or as a standalone bouquet.',
    price: 19.99,
    tags: ['babys-breath', 'delicate', 'filler'],
    addedDate: '2024-10-26T00:00:00Z',
    mostCommon: true,
    category: 'Baby\'s Breath',
    stock: 50,
  },
  {
    id: '18',
    name: 'Protea Power',
    slug: 'protea-power',
    description: 'Exotic protea flowers that make a dramatic statement. Perfect for unique arrangements.',
    price: 69.99,
    tags: ['protea', 'exotic', 'unique'],
    addedDate: '2024-10-25T00:00:00Z',
    category: 'Protea',
    stock: 8,
  },
  {
    id: '19',
    name: 'Sweet Pea Sweetness',
    slug: 'sweet-pea-sweetness',
    description: 'Fragrant sweet peas in soft colors. Perfect for spring and summer arrangements.',
    price: 36.99,
    tags: ['sweet-peas', 'fragrant', 'soft'],
    addedDate: '2024-10-24T00:00:00Z',
    category: 'Sweet Peas',
    stock: 20,
  },
  {
    id: '20',
    name: 'Calla Lily Class',
    slug: 'calla-lily-class',
    description: 'Elegant calla lilies in classic white. Sophisticated and timeless.',
    price: 62.99,
    originalPrice: 79.99,
    tags: ['calla-lily', 'elegant', 'classic'],
    addedDate: '2024-10-23T00:00:00Z',
    bestSeller: true,
    category: 'Calla Lilies',
    stock: 11,
  },
];

/**
 * Helper functions to filter and sort products
 */

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.bestSeller);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
};

export const getMostCommon = (): Product[] => {
  return products.filter((p) => p.mostCommon);
};

export const getRecentlyAdded = (): Product[] => {
  return [...products].sort((a, b) => {
    return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
  });
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return products;
  
  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  });
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

