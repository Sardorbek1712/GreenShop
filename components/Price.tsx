/**
 * Price component - Displays product price with optional original price and discount badge
 * Handles currency formatting and discount calculations
 */

"use client";

import React from "react";
import clsx from "clsx";
import { calculateDiscount } from "@/lib/data/products";

interface PriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  showDiscount?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  originalPrice,
  size = "md",
  showDiscount = true,
  className,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount ? calculateDiscount(originalPrice, price) : 0;

  const sizeClasses = {
    sm: {
      price: "text-base",
      original: "text-xs",
      badge: "text-[10px] px-1.5 py-0.5",
    },
    md: {
      price: "text-lg",
      original: "text-sm",
      badge: "text-xs px-2 py-0.5",
    },
    lg: {
      price: "text-2xl",
      original: "text-base",
      badge: "text-sm px-2.5 py-1",
    },
  };

  const formatPrice = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={clsx("flex items-center gap-2 flex-wrap", className)}>
      {/* Current Price */}
      <span
        className={clsx(
          "font-bold text-primary-600 dark:text-primary-400",
          sizeClasses[size].price
        )}
      >
        {formatPrice(price)}
      </span>

      {/* Original Price (if discounted) */}
      {hasDiscount && (
        <span
          className={clsx(
            "text-neutral-500 dark:text-neutral-400 line-through",
            sizeClasses[size].original
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}

      {/* Discount Badge */}
      {hasDiscount && showDiscount && (
        <span
          className={clsx(
            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
            "font-bold rounded-full",
            sizeClasses[size].badge
          )}
        >
          -{discount}%
        </span>
      )}
    </div>
  );
};
