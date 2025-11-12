/**
 * Recently Added Page - Displays newest products sorted by date
 */

'use client';

import { getRecentlyAdded } from '@/lib/data/products';
import { ProductGrid } from '@/components/ProductGrid';

export default function AddedRecentlyPage() {
  const recentProducts = getRecentlyAdded();

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text">
            New Arrivals
          </h1>
          <span className="badge badge-new text-base px-3 py-1">
            Just In
          </span>
        </div>
        <p className="text-neutral-600 dark:text-dark-textSecondary">
          Fresh additions to our collection — discover the latest blooms
        </p>
      </div>

      <ProductGrid
        products={recentProducts}
        emptyMessage="No new arrivals at the moment"
      />
    </div>
  );
}

