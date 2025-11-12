/**
 * ThemeToggle component - Toggle between light and dark themes
 * Persists theme preference to localStorage
 */

"use client";

import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IconButton } from "./IconButton";

const THEME_STORAGE_KEY = "greenshop-theme";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage and system preference on mount
  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div className="w-10 h-10" /> // Placeholder to prevent layout shift
    );
  }

  return (
    <IconButton
      icon={
        isDark ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-neutral-600" />
        )
      }
      onClick={toggleTheme}
      ariaLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      variant="ghost"
    />
  );
};
