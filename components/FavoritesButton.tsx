/**
 * FavoritesButton component - Heart icon button to toggle favorite status
 * Provides visual feedback and animations
 */

"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import clsx from "clsx";

interface FavoritesButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  isFavorite,
  onToggle,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={clsx(
        "p-2 rounded-full transition-all duration-200",
        "hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm",
        "shadow-md hover:shadow-lg",
        className
      )}
    >
      {isFavorite ? (
        <FaHeart
          className={clsx("text-red-500 animate-pulse-soft", sizeClasses[size])}
        />
      ) : (
        <FaRegHeart
          className={clsx(
            "text-neutral-600 dark:text-neutral-400 hover:text-red-400",
            sizeClasses[size]
          )}
        />
      )}
    </button>
  );
};
