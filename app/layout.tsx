/**
 * Root Layout - Wraps all pages with common layout structure
 * Includes fonts, global styles, header, and footer
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/components.css';
import '@/styles/utilities.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GreenShop - Premium Flower Delivery',
  description: 'Your premier destination for beautiful, fresh flowers. Discover our collection of roses, tulips, orchids, and more. Same-day delivery available.',
  keywords: ['flowers', 'bouquet', 'roses', 'delivery', 'floral', 'gifts'],
  authors: [{ name: 'GreenShop' }],
  openGraph: {
    title: 'GreenShop - Premium Flower Delivery',
    description: 'Beautiful fresh flowers delivered to your door',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

