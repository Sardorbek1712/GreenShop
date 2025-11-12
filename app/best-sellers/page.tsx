/**
 * Best Sellers Page - Displays products marked as best sellers
 */

"use client";

import { getBestSellers } from "@/lib/data/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function BestSellersPage() {
  const bestSellers = getBestSellers();

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-2">
          Best Sellers
        </h1>
        <p className="text-neutral-600 dark:text-dark-textSecondary">
          Our most popular flowers, loved by customers everywhere
        </p>
      </div>

      <ProductGrid
        products={bestSellers}
        emptyMessage="No best sellers at the moment"
      />
    </div>
  );
}
