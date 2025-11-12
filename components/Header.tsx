/**
 * Header component - Main navigation with logo, search, cart, favorites, and theme toggle
 * Includes mobile responsive menu and call button with modal
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaPhone,
  FaLeaf,
} from "react-icons/fa";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { IconButton } from "./IconButton";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

const PHONE_NUMBER = "+4916099661885";

const navigationLinks = [
  { href: "/", label: "All" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/discounts", label: "Discounts" },
  { href: "/most-common", label: "Most Common" },
  { href: "/added-recently", label: "New Arrivals" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [showCallToast, setShowCallToast] = useState(false);

  const handleCallClick = () => {
    setIsCallModalOpen(true);
    setShowCallToast(true);
    setTimeout(() => setShowCallToast(false), 3000);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky-header">
        <div className="container-custom py-4">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center gap-4 mb-4">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <IconButton
                icon={isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                onClick={handleMobileMenuToggle}
                ariaLabel="Toggle menu"
                variant="ghost"
              />
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:opacity-80 transition-opacity"
            >
              <FaLeaf className="text-2xl" />
              <span className="text-xl font-bold hidden sm:inline">
                GreenShop
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-xl">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Call Button */}
              <IconButton
                icon={<FaPhone />}
                onClick={handleCallClick}
                ariaLabel="Contact us"
                variant="primary"
              />

              {/* Favorites */}
              <Link href="/?favorites=true">
                <IconButton
                  icon={<FaHeart />}
                  ariaLabel="Favorites"
                  variant="ghost"
                  badge={favoriteCount}
                />
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <IconButton
                  icon={<FaShoppingCart />}
                  ariaLabel="Shopping cart"
                  variant="ghost"
                  badge={itemCount}
                />
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden mb-4">
            <SearchBar />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "nav-link",
                  pathname === link.href && "nav-link-active"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-dark-border animate-fadeIn">
            <nav className="container-custom py-4 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={clsx(
                    "block px-4 py-3 rounded-lg text-neutral-700 dark:text-dark-textSecondary",
                    "hover:bg-neutral-100 dark:hover:bg-dark-card transition-colors",
                    "font-medium",
                    pathname === link.href &&
                      "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Call Modal */}
      {isCallModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsCallModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-text">
                Contact Us
              </h3>
              <button
                onClick={() => setIsCallModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <FaPhone className="text-2xl text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-dark-textSecondary">
                    Phone Number
                  </p>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-dark-text">
                    {PHONE_NUMBER}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <FaPhone />
                Call Now
              </a>

              <button
                onClick={() => setIsCallModalOpen(false)}
                className="btn btn-secondary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Toast */}
      {showCallToast && (
        <div className="toast toast-info">
          <p className="text-sm font-medium text-neutral-900 dark:text-dark-text">
            Call us anytime! We&apos;re here to help.
          </p>
        </div>
      )}
    </>
  );
};
