/**
 * ProductGrid component - Grid layout for displaying multiple products
 * Handles empty states and loading states
 */

"use client";

import React from "react";
import clsx from "clsx";
import { Product } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";
import { FaLeaf } from "react-icons/fa";

interface ProductGridProps {
  products: Product[];
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  emptyMessage = "No products found",
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={clsx("product-grid", className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="skeleton-image" />
            <div className="p-4 space-y-3">
              <div className="skeleton-text" />
              <div className="skeleton-text w-3/4" />
              <div className="skeleton-text w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FaLeaf />
        </div>
        <h3 className="empty-state-title">{emptyMessage}</h3>
        <p className="empty-state-description">
          Try browsing other categories or adjusting your search
        </p>
      </div>
    );
  }

  return (
    <div className={clsx("product-grid", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
