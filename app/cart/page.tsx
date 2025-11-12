/**
 * Cart Page - Full cart view with checkout functionality
 * Displays all cart items, quantity controls, and order summary
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '@/hooks/useCart';
import { getProductThumbnail } from '@/lib/utils/fetchImage';
import { Price } from '@/components/Price';
import clsx from 'clsx';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
  } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout/payment
    alert('Checkout functionality would be implemented here. Thank you for shopping with GreenShop!');
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center">
          <FaShoppingBag className="text-8xl text-neutral-300 dark:text-dark-border mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-neutral-600 dark:text-dark-textSecondary mb-8">
            Looks like you haven&apos;t added any flowers to your cart yet. Start shopping to fill it up!
          </p>
          <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
            <FaShoppingBag />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-4"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-2">
          Shopping Cart
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-neutral-600 dark:text-dark-textSecondary">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="card p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <Link
                  href={`/flower/${item.product.slug}`}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <Image
                    src={getProductThumbnail(item.product.slug)}
                    alt={item.product.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/flower/${item.product.slug}`}
                        className="font-semibold text-lg text-neutral-900 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors block truncate"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-neutral-600 dark:text-dark-textSecondary truncate-2">
                        {item.product.description}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Remove from cart"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <Price
                      price={item.product.price}
                      originalPrice={item.product.originalPrice}
                      size="md"
                    />

                    {/* Quantity Controls */}
                    <div className="quantity-control">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-dark-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-dark-textSecondary">
                        Item Total:
                      </span>
                      <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-dark-text mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Subtotal
                </span>
                <span className="font-semibold text-neutral-900 dark:text-dark-text">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Tax (10%)
                </span>
                <span className="font-semibold text-neutral-900 dark:text-dark-text">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
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

              {subtotal < 100 && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3">
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
            </div>

            <div className="divider-y my-4" />

            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-lg text-neutral-900 dark:text-dark-text">
                Total
              </span>
              <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full flex items-center justify-center gap-2 mb-3"
            >
              <FaShoppingBag />
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="btn btn-secondary w-full flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

