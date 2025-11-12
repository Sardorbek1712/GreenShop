/**
 * Product Detail Page - Shows detailed product information
 * Dynamic route based on product slug
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaShoppingCart, FaCheck, FaHeart } from 'react-icons/fa';
import { getProductBySlug } from '@/lib/data/products';
import { getProductLargeImage } from '@/lib/utils/fetchImage';
import { Price } from '@/components/Price';
import { FavoritesButton } from '@/components/FavoritesButton';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/lib/data/products';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-4">
          Product Not Found
        </h1>
        <p className="text-neutral-600 dark:text-dark-textSecondary mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
          >
            <FaArrowLeft />
            Back to Shop
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Section */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-dark-border">
            <Image
              src={getProductLargeImage(product.slug)}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestSeller && (
                <span className="badge badge-primary text-base px-3 py-1">
                  Best Seller
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="badge-discount text-base px-3 py-1">
                  Sale
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <div className="absolute top-4 right-4">
              <FavoritesButton
                isFavorite={isFavorite(product.id)}
                onToggle={handleToggleFavorite}
                size="lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mt-2 mb-4">
                {product.name}
              </h1>
              <Price
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
              />
            </div>

            <div className="mb-6">
              <p className="text-neutral-600 dark:text-dark-textSecondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </div>
              ) : (
                <div className="text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 dark:text-dark-textSecondary mb-2">
                  Quantity
                </label>
                <div className="quantity-control w-fit">
                  <button
                    onClick={decreaseQuantity}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="quantity-btn"
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                {isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleToggleFavorite}
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                <FaHeart
                  className={isFavorite(product.id) ? 'text-red-500' : ''}
                />
                {isFavorite(product.id) ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="card p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Free Shipping
                </span>
                <span className="font-medium text-neutral-900 dark:text-dark-text">
                  On orders over $100
                </span>
              </div>
              <div className="divider-y" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Delivery Time
                </span>
                <span className="font-medium text-neutral-900 dark:text-dark-text">
                  Same day available
                </span>
              </div>
              <div className="divider-y" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-dark-textSecondary">
                  Freshness Guarantee
                </span>
                <span className="font-medium text-neutral-900 dark:text-dark-text">
                  7 days or replacement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-text mb-6">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>

      {/* Added to Cart Toast */}
      {showAddedToast && (
        <div className="toast toast-success">
          <div>
            <p className="font-medium text-neutral-900 dark:text-dark-text">
              Added to cart!
            </p>
            <p className="text-sm text-neutral-600 dark:text-dark-textSecondary">
              {quantity}x {product.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

