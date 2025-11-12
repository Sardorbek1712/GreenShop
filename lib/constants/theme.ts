/**
 * Theme configuration for light and dark modes
 * These objects define the full theme tokens used throughout the app
 */

import { colors } from './colors';

export const lightTheme = {
  name: 'light',
  colors: {
    // Backgrounds
    background: '#ffffff',
    backgroundSecondary: colors.neutral[50],
    backgroundAccent: colors.accent.beige,
    
    // Text
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textMuted: colors.neutral[500],
    
    // Borders
    border: colors.neutral[200],
    borderHover: colors.neutral[300],
    
    // Cards
    card: '#ffffff',
    cardHover: colors.neutral[50],
    
    // Primary actions
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryText: '#ffffff',
    
    // Accent
    accent: colors.accent.muted,
    accentHover: colors.accent.beigeDark,
    
    // Semantic
    success: colors.semantic.success,
    error: colors.semantic.error,
    warning: colors.semantic.warning,
    info: colors.semantic.info,
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowHover: 'rgba(0, 0, 0, 0.12)',
  },
} as const;

export const darkTheme = {
  name: 'dark',
  colors: {
    // Backgrounds
    background: colors.dark.bg,
    backgroundSecondary: colors.dark.bgSecondary,
    backgroundAccent: colors.dark.card,
    
    // Text
    text: colors.dark.text,
    textSecondary: colors.dark.textSecondary,
    textMuted: colors.neutral[500],
    
    // Borders
    border: colors.dark.border,
    borderHover: colors.neutral[600],
    
    // Cards
    card: colors.dark.card,
    cardHover: colors.dark.bgSecondary,
    
    // Primary actions
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryText: '#ffffff',
    
    // Accent
    accent: colors.accent.muted,
    accentHover: colors.accent.beigeDark,
    
    // Semantic
    success: colors.semantic.success,
    error: colors.semantic.error,
    warning: colors.semantic.warning,
    info: colors.semantic.info,
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowHover: 'rgba(0, 0, 0, 0.4)',
  },
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;

