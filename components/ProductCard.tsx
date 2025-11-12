/**
 * ProductCard component - Displays product with image, name, price, and actions
 * Includes hover effects for favorites and quick add to cart
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import { Product } from "@/lib/data/products";
import { getProductThumbnail } from "@/lib/utils/fetchImage";
import { Price } from "./Price";
import { FavoritesButton } from "./FavoritesButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const isDiscounted =
    product.originalPrice && product.originalPrice > product.price;
  const isNew = () => {
    const addedDate = new Date(product.addedDate);
    const daysDiff = (Date.now() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7; // Consider "new" if added within 7 days
  };

  return (
    <>
      <Link
        href={`/flower/${product.slug}`}
        className={clsx(
          "group card-hover block overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-dark-border">
          <Image
            src={getProductThumbnail(product.slug)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew() && <span className="badge badge-new">New</span>}
            {product.bestSeller && (
              <span className="badge badge-primary">Best Seller</span>
            )}
          </div>

          {/* Favorite Button - Always visible on mobile, hover on desktop */}
          <div className="absolute top-3 right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <FavoritesButton
              isFavorite={isFavorite(product.id)}
              onToggle={handleToggleFavorite}
              size="sm"
            />
          </div>

          {/* Hover Overlay with Quick Actions */}
          <div className="product-card-image-overlay">
            <button
              onClick={handleAddToCart}
              className="product-card-action-btn"
              aria-label="Quick add to cart"
            >
              <FaShoppingCart className="text-lg" />
            </button>
          </div>

          {/* Stock indicator */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-semibold px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-dark-text mb-1 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-dark-textSecondary mb-3 truncate-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <Price
              price={product.price}
              originalPrice={product.originalPrice}
              size="md"
            />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={clsx(
                "p-2 rounded-lg",
                "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600",
                "text-white transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              )}
              aria-label="Add to cart"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-success">
          <p className="text-sm font-medium text-neutral-900 dark:text-dark-text">
            Added to cart!
          </p>
        </div>
      )}
    </>
  );
};
