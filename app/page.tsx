/**
 * Home Page - Displays all products with search functionality
 * Filters by favorites if query param present
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { products, searchProducts } from '@/lib/data/products';
import { ProductGrid } from '@/components/ProductGrid';
import { useFavorites } from '@/hooks/useFavorites';

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const showFavorites = searchParams.get('favorites') === 'true';
  const { favorites } = useFavorites();

  // Get products based on search query or favorites filter
  let displayProducts = query ? searchProducts(query) : products;

  // Filter by favorites if requested
  if (showFavorites) {
    displayProducts = displayProducts.filter((p) => favorites.includes(p.id));
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-2">
          {showFavorites
            ? 'Your Favorites'
            : query
            ? `Search Results for "${query}"`
            : 'All Flowers'}
        </h1>
        <p className="text-neutral-600 dark:text-dark-textSecondary">
          {showFavorites
            ? `${displayProducts.length} favorite ${displayProducts.length !== 1 ? 'items' : 'item'}`
            : query
            ? `Found ${displayProducts.length} ${displayProducts.length !== 1 ? 'results' : 'result'}`
            : 'Discover our complete collection of beautiful fresh flowers'}
        </p>
      </div>

      <ProductGrid
        products={displayProducts}
        emptyMessage={
          showFavorites
            ? 'No favorites yet. Start adding flowers you love!'
            : query
            ? `No flowers found for "${query}"`
            : 'No products available'
        }
      />
    </div>
  );
}

