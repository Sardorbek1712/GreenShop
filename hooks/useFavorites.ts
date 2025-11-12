/**
 * useFavorites hook - Manages favorite products with localStorage persistence
 * Provides add, remove, toggle, and check functionality
 */

"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_STORAGE_KEY = "greenshop-favorites";

/**
 * Load favorites from localStorage
 */
const loadFavoritesFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
  }

  return [];
};

/**
 * Save favorites to localStorage
 */
const saveFavoritesToStorage = (favorites: string[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadedFavorites = loadFavoritesFromStorage();
    setFavorites(loadedFavorites);
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveFavoritesToStorage(favorites);
    }
  }, [favorites, isLoaded]);

  /**
   * Add product to favorites
   */
  const addToFavorites = useCallback((productId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites; // Already in favorites
      }
      return [...prevFavorites, productId];
    });
  }, []);

  /**
   * Remove product from favorites
   */
  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== productId)
    );
  }, []);

  /**
   * Toggle favorite status (add if not present, remove if present)
   */
  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  }, []);

  /**
   * Check if product is in favorites
   */
  const isFavorite = useCallback(
    (productId: string): boolean => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  /**
   * Get all favorite product IDs
   */
  const getAllFavorites = useCallback((): string[] => {
    return favorites;
  }, [favorites]);

  /**
   * Clear all favorites
   */
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  /**
   * Get count of favorite items
   */
  const favoriteCount = favorites.length;

  return {
    favorites,
    isLoaded,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getAllFavorites,
    clearFavorites,
    favoriteCount,
  };
};
