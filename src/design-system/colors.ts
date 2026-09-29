/**
 * Maersk Training Official Brand Palette Tokens
 * Authoritative color tokens as specified in design system guidelines.
 */

export const MAERSK_COLORS = {
  // Primary brand palette
  deepBlue: '#003E61', // Primary brand dark / text / primary headings
  maerskBlue: '#42B0D5', // Iconic sky blue accent / logo background
  midBlue: '#1686BD', // Interactive primary action / active navigation
  lightBlue: '#A1D1E8', // Soft borders / secondary accents
  paleBlue: '#E2F3FB', // Card backgrounds / hover highlights
  coral: '#EA5D4B', // Attention / badges / alerts ONLY (use sparingly)

  // Neutral enterprise system
  white: '#FFFFFF',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',

  // Status colors
  readyGreen: '#16A34A',
  readyGreenBg: '#DCFCE7',
  readyGreenBorder: '#BBF7D0',
} as const;

export type MaerskColorKey = keyof typeof MAERSK_COLORS;
