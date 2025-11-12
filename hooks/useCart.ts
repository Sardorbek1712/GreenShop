/**
 * useCart hook - Manages shopping cart state with localStorage persistence
 * Provides add, remove, update quantity, and total calculation functionality
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = "greenshop-cart";

/**
 * Load cart from localStorage
 */
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }

  return [];
};

/**
 * Save cart to localStorage
 */
const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage();
    setCart(loadedCart);
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoaded]);

  /**
   * Add product to cart or increase quantity if already exists
   */
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if product already in cart
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity }];
      }
    });
  }, []);

  /**
   * Remove product from cart completely
   */
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  }, []);

  /**
   * Update quantity of a specific product
   */
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  /**
   * Increase quantity by 1
   */
  const increaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  /**
   * Decrease quantity by 1 (removes if quantity becomes 0)
   */
  const decreaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }, []);

  /**
   * Clear entire cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * Get quantity of a specific product in cart
   */
  const getItemQuantity = useCallback(
    (productId: string): number => {
      const item = cart.find((item) => item.product.id === productId);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  /**
   * Check if product is in cart
   */
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cart.some((item) => item.product.id === productId);
    },
    [cart]
  );

  /**
   * Calculate subtotal (sum of all items)
   */
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  /**
   * Calculate total items count
   */
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  /**
   * Calculate tax (example: 10%)
   */
  const tax = subtotal * 0.1;

  /**
   * Calculate shipping (free over $100, otherwise $10)
   */
  const shipping = subtotal >= 100 ? 0 : subtotal > 0 ? 10 : 0;

  /**
   * Calculate grand total
   */
  const total = subtotal + tax + shipping;

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
  };
};
