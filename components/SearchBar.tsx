/**
 * SearchBar component - Global search with debounce and real-time results
 * Displays search results dropdown and handles URL query params
 */

"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { searchProducts, Product } from "@/lib/data/products";
import { getProductThumbnail } from "@/lib/utils/fetchImage";
import { Price } from "./Price";

interface SearchBarProps {
  className?: string;
  onResultClick?: () => void;
}

function SearchBarContent({
  className,
  onResultClick,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize query from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const searchResults = searchProducts(query);
      setResults(searchResults);
      setIsOpen(true);
      setIsSearching(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);

      // Update URL with search query
      if (value.trim()) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("q", value);
        router.push(`/?${params.toString()}`, { scroll: false });
      } else {
        router.push("/", { scroll: false });
      }
    },
    [router, searchParams]
  );

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    router.push("/", { scroll: false });
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    onResultClick?.();
  };

  return (
    <div ref={searchRef} className={clsx("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search flowers..."
          className={clsx(
            "w-full pl-10 pr-10 py-2.5 rounded-lg",
            "border border-neutral-300 dark:border-dark-border",
            "bg-white dark:bg-dark-card",
            "text-neutral-900 dark:text-dark-text",
            "placeholder-neutral-500",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-200"
          )}
        />

        {query && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="search-results-dropdown animate-fadeIn">
          {isSearching ? (
            <div className="p-4 text-center text-neutral-500">Searching...</div>
          ) : results.length > 0 ? (
            <>
              <div className="p-2 text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-dark-border">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                {results.slice(0, 10).map((product) => (
                  <Link
                    key={product.id}
                    href={`/flower/${product.slug}`}
                    onClick={handleResultClick}
                    className={clsx(
                      "flex items-center gap-3 p-3",
                      "hover:bg-neutral-50 dark:hover:bg-dark-border",
                      "transition-colors border-b border-neutral-100 dark:border-dark-border last:border-0"
                    )}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={getProductThumbnail(product.slug)}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-dark-text truncate">
                        {product.name}
                      </h4>
                      <Price
                        price={product.price}
                        originalPrice={product.originalPrice}
                        size="sm"
                        showDiscount={false}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-neutral-500 dark:text-neutral-400">
                No flowers found for &quot;{query}&quot;
              </p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <Suspense fallback={
      <div className={clsx("relative", props.className)}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            disabled
            placeholder="Search flowers..."
            className={clsx(
              "w-full pl-10 pr-10 py-2.5 rounded-lg",
              "border border-neutral-300 dark:border-dark-border",
              "bg-white dark:bg-dark-card",
              "text-neutral-900 dark:text-dark-text",
              "placeholder-neutral-500",
              "opacity-50"
            )}
          />
        </div>
      </div>
    }>
      <SearchBarContent {...props} />
    </Suspense>
  );
};
