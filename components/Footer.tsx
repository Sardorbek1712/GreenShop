/**
 * Footer component - Site footer with links, info, and social media
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  FaLeaf,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-4"
            >
              <FaLeaf className="text-2xl" />
              <span className="text-xl font-bold">GreenShop</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Your premier destination for beautiful, fresh flowers. Bringing
              nature&apos;s beauty to your doorstep.
            </p>
            
            {/* Contact Info */}
            <div className="mb-4 space-y-2">
              <a
                href="mailto:sardor.tolibov04@gmail.com"
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaEnvelope className="text-base" />
                <span>sardor.tolibov04@gmail.com</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/serdar4eek_04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                aria-label="Instagram"
                title="@serdar4eek_04"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-link-group">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Shop
            </h3>
            <Link href="/" className="footer-link block">
              All Flowers
            </Link>
            <Link href="/best-sellers" className="footer-link block">
              Best Sellers
            </Link>
            <Link href="/discounts" className="footer-link block">
              Discounts
            </Link>
            <Link href="/most-common" className="footer-link block">
              Most Common
            </Link>
            <Link href="/added-recently" className="footer-link block">
              New Arrivals
            </Link>
          </div>

          {/* Customer Service */}
          <div className="footer-link-group">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Customer Service
            </h3>
            <a href="#contact" className="footer-link block">
              Contact Us
            </a>
            <a href="#shipping" className="footer-link block">
              Shipping Info
            </a>
            <a href="#returns" className="footer-link block">
              Returns & Exchanges
            </a>
            <a href="#faq" className="footer-link block">
              FAQs
            </a>
            <a href="#care" className="footer-link block">
              Flower Care Guide
            </a>
          </div>

          {/* About */}
          <div className="footer-link-group">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              About
            </h3>
            <a href="#about" className="footer-link block">
              About Us
            </a>
            <a href="#sustainability" className="footer-link block">
              Sustainability
            </a>
            <a href="#careers" className="footer-link block">
              Careers
            </a>
            <a href="#blog" className="footer-link block">
              Blog
            </a>
            <a href="#privacy" className="footer-link block">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                © {currentYear} GreenShop. All rights reserved.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                Developed with 💚 by{" "}
                <a
                  href="https://instagram.com/serdar4eek_04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  Sardorbek Tolipov
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#terms"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#privacy"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
