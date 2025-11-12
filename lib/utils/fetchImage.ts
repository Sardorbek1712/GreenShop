/**
 * Utility for fetching product images dynamically from Unsplash
 * Falls back to placeholder if fetch fails
 */

const UNSPLASH_BASE = 'https://images.unsplash.com';
const PLACEHOLDER_URL = 'https://via.placeholder.com/400x400/22c55e/ffffff?text=';

/**
 * Predefined high-quality Unsplash image IDs for different flower types
 * These are curated to ensure consistent, beautiful images
 */
const FLOWER_IMAGE_MAP: Record<string, string> = {
  // Roses
  'red-rose-bouquet': 'photo-1518709594023-6eab9bab7b23',
  'rose': 'photo-1518709594023-6eab9bab7b23',
  
  // Sunflowers
  'sunflower-delight': 'photo-1597848212624-e526162ce8e8',
  'sunflower': 'photo-1597848212624-e526162ce8e8',
  
  // Lavender
  'lavender-dreams': 'photo-1499002238440-d264edd596ec',
  'lavender': 'photo-1499002238440-d264edd596ec',
  
  // Tulips
  'tulip-paradise': 'photo-1490750967868-88aa4486c946',
  'tulip': 'photo-1490750967868-88aa4486c946',
  
  // Orchids
  'white-orchid-elegance': 'photo-1520763185298-1b434c919b14',
  'orchid': 'photo-1520763185298-1b434c919b14',
  
  // Daisies
  'daisy-chain': 'photo-1463936575829-25148e1db1b8',
  'daisy': 'photo-1463936575829-25148e1db1b8',
  
  // Peonies
  'peony-perfection': 'photo-1591886960571-74d43a9d4166',
  'peony': 'photo-1591886960571-74d43a9d4166',
  
  // Hydrangeas
  'hydrangea-haven': 'photo-1511916758862-ae8e0235ae87',
  'hydrangea': 'photo-1511916758862-ae8e0235ae87',
  
  // Lilies
  'lily-luxury': 'photo-1524386416438-98b9b2d4b433',
  'lily': 'photo-1524386416438-98b9b2d4b433',
  
  // Carnations
  'carnation-celebration': 'photo-1562690868-60bbe7293e94',
  'carnation': 'photo-1562690868-60bbe7293e94',
  
  // Gerberas
  'gerbera-joy': 'photo-1563216991-c5d4b0f0c0f7',
  'gerbera': 'photo-1563216991-c5d4b0f0c0f7',
  
  // Iris
  'iris-collection': 'photo-1490750967868-88aa4486c946',
  'iris': 'photo-1490750967868-88aa4486c946',
  
  // Mixed bouquets
  'mixed-spring-bouquet': 'photo-1487070183336-b863922373d4',
  'mixed': 'photo-1487070183336-b863922373d4',
  
  // Chrysanthemums
  'chrysanthemum-beauty': 'photo-1574684891174-df6b02ab38d7',
  'chrysanthemum': 'photo-1574684891174-df6b02ab38d7',
  
  // Ranunculus
  'ranunculus-romance': 'photo-1455659817273-f96807779a8a',
  'ranunculus': 'photo-1455659817273-f96807779a8a',
  
  // Anemones
  'anemone-arrangement': 'photo-1455659817273-f96807779a8a',
  'anemone': 'photo-1455659817273-f96807779a8a',
  
  // Baby's Breath
  'babys-breath-bundle': 'photo-1563241527-3004b7be0ffd',
  'babys-breath': 'photo-1563241527-3004b7be0ffd',
  
  // Protea
  'protea-power': 'photo-1497276236755-0f85ba99a126',
  'protea': 'photo-1497276236755-0f85ba99a126',
  
  // Sweet Peas
  'sweet-pea-sweetness': 'photo-1518709594023-6eab9bab7b23',
  'sweet-pea': 'photo-1518709594023-6eab9bab7b23',
  
  // Calla Lilies
  'calla-lily-class': 'photo-1524386416438-98b9b2d4b433',
  'calla-lily': 'photo-1524386416438-98b9b2d4b433',
};

/**
 * Get image URL for a product
 * @param productSlug - The product slug or flower name
 * @param width - Desired width (default 800)
 * @param height - Desired height (default 800)
 * @returns Image URL
 */
export const getProductImageUrl = (
  productSlug: string,
  width: number = 800,
  height: number = 800
): string => {
  // Check if we have a predefined image for this product
  const imageId = FLOWER_IMAGE_MAP[productSlug];
  
  if (imageId) {
    // Return Unsplash image with specific dimensions
    return `${UNSPLASH_BASE}/${imageId}?w=${width}&h=${height}&fit=crop&auto=format`;
  }
  
  // Fallback: Try to match partial name
  const matchingKey = Object.keys(FLOWER_IMAGE_MAP).find((key) =>
    productSlug.toLowerCase().includes(key)
  );
  
  if (matchingKey) {
    const imageId = FLOWER_IMAGE_MAP[matchingKey];
    return `${UNSPLASH_BASE}/${imageId}?w=${width}&h=${height}&fit=crop&auto=format`;
  }
  
  // Last resort: Return placeholder with flower name
  const flowerName = productSlug.replace(/-/g, '+');
  return `${PLACEHOLDER_URL}${flowerName}`;
};

/**
 * Get thumbnail image URL (smaller size for cards)
 */
export const getProductThumbnail = (productSlug: string): string => {
  return getProductImageUrl(productSlug, 400, 400);
};

/**
 * Get large image URL (for product detail page)
 */
export const getProductLargeImage = (productSlug: string): string => {
  return getProductImageUrl(productSlug, 1200, 1200);
};

/**
 * Preload image to check if it's valid
 * Returns true if image loads successfully, false otherwise
 */
export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Get fallback image URL
 */
export const getFallbackImage = (productName: string): string => {
  const name = productName.replace(/\s+/g, '+');
  return `${PLACEHOLDER_URL}${name}`;
};

