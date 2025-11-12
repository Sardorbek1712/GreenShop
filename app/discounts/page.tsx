/**
 * Discounts Page - Displays products with active discounts
 */

'use client';

import { getDiscountedProducts } from '@/lib/data/products';
import { ProductGrid } from '@/components/ProductGrid';

export default function DiscountsPage() {
  const discountedProducts = getDiscountedProducts();

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text">
            Special Discounts
          </h1>
          <span className="badge-discount text-lg px-3 py-1">
            Save Now!
          </span>
        </div>
        <p className="text-neutral-600 dark:text-dark-textSecondary">
          Beautiful flowers at unbeatable prices — limited time offers
        </p>
      </div>

      <ProductGrid
        products={discountedProducts}
        emptyMessage="No discounts available right now. Check back soon!"
      />
    </div>
  );
}

