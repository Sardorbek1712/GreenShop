/**
 * IconButton component - Reusable button with icon
 * Supports various styles and accessibility features
 */

"use client";

import React from "react";
import clsx from "clsx";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel: string;
  badge?: number | string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = "default",
  size = "md",
  className,
  ariaLabel,
  badge,
  disabled = false,
  type = "button",
}) => {
  const sizeClasses = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };

  const variantClasses = {
    default:
      "hover:bg-neutral-100 dark:hover:bg-dark-card text-neutral-700 dark:text-dark-textSecondary",
    primary:
      "hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 dark:text-primary-400",
    ghost:
      "hover:bg-neutral-50 dark:hover:bg-dark-border text-neutral-600 dark:text-dark-textSecondary",
    outline:
      "border-2 border-neutral-300 dark:border-dark-border hover:bg-neutral-50 dark:hover:bg-dark-card",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        "relative rounded-full transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {icon}

      {/* Badge indicator */}
      {badge !== undefined && badge !== 0 && (
        <span
          className={clsx(
            "absolute -top-1 -right-1",
            "bg-red-500 text-white text-xs font-bold",
            "rounded-full min-w-[18px] h-[18px]",
            "flex items-center justify-center",
            "px-1"
          )}
        >
          {typeof badge === "number" && badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
};
