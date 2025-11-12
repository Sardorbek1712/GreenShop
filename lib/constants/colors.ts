/**
 * Central color tokens for GreenShop
 * All colors are defined here for easy theme customization
 */

export const colors = {
  // Primary green palette - main brand colors
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main brand green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Complementary accent colors
  accent: {
    beige: '#f5f1ed',
    beigeDark: '#e5ddd5',
    pastel: '#fef3e2',
    muted: '#d4a574',
  },
  
  // Neutral colors for text and backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Semantic colors
  semantic: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  // Dark theme specific
  dark: {
    bg: '#0f1419',
    bgSecondary: '#1a1f2e',
    card: '#1e2530',
    border: '#2d3748',
    text: '#e5e7eb',
    textSecondary: '#9ca3af',
  },
} as const;

export type ColorToken = typeof colors;

