/**
 * CartDrawer component - Sliding drawer displaying cart items
 * Includes quantity controls, totals, and checkout button
 */

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {
  FaTimes,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
} from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { getProductThumbnail } from "@/lib/utils/fetchImage";
import { Price } from "./Price";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-drawer-backdrop animate-fadeIn" onClick={onClose} />

      {/* Drawer Panel */}
      <div
        className={clsx(
          "cart-drawer-panel",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-dark-border">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-dark-text">
              Shopping Cart ({cart.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-dark-border rounded-full transition-colors"
              aria-label="Close cart"
            >
              <FaTimes className="text-neutral-600 dark:text-dark-textSecondary" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FaShoppingBag className="text-6xl text-neutral-300 dark:text-dark-border mb-4" />
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-dark-textSecondary mb-2">
                  Your cart is empty
                </h3>
                <p className="text-neutral-500 dark:text-neutral-500 mb-4">
                  Add some beautiful flowers to get started!
                </p>
                <Link href="/" onClick={onClose} className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="card p-3 flex gap-3">
                    {/* Product Image */}
                    <Link
                      href={`/flower/${item.product.slug}`}
                      onClick={onClose}
                      className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={getProductThumbnail(item.product.slug)}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/flower/${item.product.slug}`}
                        onClick={onClose}
                        className="font-medium text-neutral-900 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors block truncate"
                      >
                        {item.product.name}
                      </Link>

                      <Price
                        price={item.product.price}
                        originalPrice={item.product.originalPrice}
                        size="sm"
                        showDiscount={false}
                        className="my-1"
                      />

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="quantity-control">
                          <button
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="quantity-btn"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.product.id)}
                            className="quantity-btn"
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          aria-label="Remove from cart"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Totals */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-200 dark:border-dark-border p-4 space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Subtotal
                </span>
                <span className="font-semibold text-neutral-900 dark:text-dark-text">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Tax (10%)
                </span>
                <span className="font-semibold text-neutral-900 dark:text-dark-text">
                  ${tax.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Shipping
                </span>
                <span className="font-semibold text-neutral-900 dark:text-dark-text">
                  {shipping === 0 ? (
                    <span className="text-primary-600 dark:text-primary-400">
                      FREE
                    </span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {/* Free shipping notice */}
              {subtotal < 100 && subtotal > 0 && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center py-1">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <div className="divider-y my-2" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 dark:text-dark-text">
                  Total
                </span>
                <span className="font-bold text-xl text-primary-600 dark:text-primary-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/cart"
                onClick={onClose}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <FaShoppingBag />
                View Cart & Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
