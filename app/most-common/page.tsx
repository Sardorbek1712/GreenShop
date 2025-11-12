/**
 * Most Common Page - Displays products marked as most common
 */

'use client';

import { getMostCommon } from '@/lib/data/products';
import { ProductGrid } from '@/components/ProductGrid';

export default function MostCommonPage() {
  const mostCommon = getMostCommon();

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-2">
          Most Common
        </h1>
        <p className="text-neutral-600 dark:text-dark-textSecondary">
          Popular everyday flowers perfect for any occasion
        </p>
      </div>

      <ProductGrid
        products={mostCommon}
        emptyMessage="No common flowers available at the moment"
      />
    </div>
  );
}

