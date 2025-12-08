/**
 * DESIGN SYSTEM TOKENS
 * Central source of truth for all design values
 * Following 8px spacing grid and consistent naming conventions
 */

// ========================================
// BRAND COLORS
// ========================================

export const colors = {
  // Primary - Calypso
  calypso: {
    50: '#e6f2f5',
    100: '#cce5eb',
    200: '#99cbd7',
    300: '#66b0c3',
    400: '#3396af',
    500: '#006781', // Main
    600: '#005267',
    700: '#003e4d',
    800: '#002933',
    900: '#00151a',
  },
  
  // Secondary - Pistachio
  pistachio: {
    50: '#f4f7e8',
    100: '#e9efd1',
    200: '#d3dfa3',
    300: '#bdcf75',
    400: '#a7bf47',
    500: '#95b730', // Main
    600: '#779226',
    700: '#596e1d',
    800: '#3c4913',
    900: '#1e250a',
  },
  
  // Accent - Tulip
  tulip: {
    50: '#fef8ea',
    100: '#fdf1d5',
    200: '#fbe3ab',
    300: '#f9d581',
    400: '#f7c757',
    500: '#f0b52b', // Main
    600: '#c09122',
    700: '#906d1a',
    800: '#604811',
    900: '#302409',
  },
  
  // Neutrals
  neutral: {
    50: '#f7f7f7',
    100: '#ececf0',
    200: '#d1d5db',
    300: '#9ca3af',
    400: '#717182',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#292929',
    900: '#1f2937',
    950: '#0f172a',
  },
  
  // Semantic Colors
  semantic: {
    success: '#95b730',
    warning: '#f0b52b',
    error: '#dc2626',
    info: '#006781',
  },
  
  // Special
  white: '#ffffff',
  black: '#000000',
} as const;

// ========================================
// GRADIENTS
// ========================================

export const gradients = {
  primary: 'linear-gradient(135deg, rgba(0,103,129,0.85) 0%, rgba(0,158,192,0.65) 100%)',
  secondary: 'linear-gradient(135deg, rgba(149,183,48,0.85) 0%, rgba(199,227,113,0.55) 100%)',
  accent: 'linear-gradient(135deg, rgba(240,181,43,0.85) 0%, rgba(248,219,128,0.55) 100%)',
  
  // Tahoe Orbs
  orb: {
    primary: 'radial-gradient(circle, rgba(0,103,129,0.15) 0%, transparent 70%)',
    secondary: 'radial-gradient(circle, rgba(149,183,48,0.12) 0%, transparent 70%)',
    accent: 'radial-gradient(circle, rgba(240,181,43,0.10) 0%, transparent 70%)',
  },
} as const;

// ========================================
// GLASS EFFECTS
// ========================================

export const glass = {
  fill: 'rgba(255, 255, 255, 0.25)',
  fillDark: 'rgba(255, 255, 255, 0.1)',
  blur: '22px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderDark: '1px solid rgba(255, 255, 255, 0.15)',
  shadow: '0 8px 24px rgba(0, 0, 0, 0.10)',
  shadowLg: '0 12px 40px rgba(0, 0, 0, 0.15)',
} as const;

// ========================================
// SPACING (8PX GRID)
// ========================================

export const spacing = {
  0: '0px',
  0.5: '4px',   // 0.5 * 8
  1: '8px',     // 1 * 8
  1.5: '12px',  // 1.5 * 8
  2: '16px',    // 2 * 8
  3: '24px',    // 3 * 8
  4: '32px',    // 4 * 8
  5: '40px',    // 5 * 8
  6: '48px',    // 6 * 8
  8: '64px',    // 8 * 8
  10: '80px',   // 10 * 8
  12: '96px',   // 12 * 8
  16: '128px',  // 16 * 8
  20: '160px',  // 20 * 8
  24: '192px',  // 24 * 8
} as const;

// ========================================
// BORDER RADIUS
// ========================================

export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// ========================================
// SHADOWS
// ========================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.10)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.12)',
  '2xl': '0 16px 40px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
} as const;

// ========================================
// TYPOGRAPHY
// ========================================

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ========================================
// BREAKPOINTS
// ========================================

export const breakpoints = {
  xs: '375px',   // Mobile S
  sm: '640px',   // Mobile L
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Desktop L
  '2xl': '1536px', // Desktop XL
} as const;

// ========================================
// Z-INDEX SCALE
// ========================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// ========================================
// TRANSITIONS
// ========================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ========================================
// LAYOUT CONSTRAINTS
// ========================================

export const layout = {
  maxWidth: {
    xs: '20rem',      // 320px
    sm: '24rem',      // 384px
    md: '28rem',      // 448px
    lg: '32rem',      // 512px
    xl: '36rem',      // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
    full: '100%',
  },
  
  container: {
    padding: {
      mobile: spacing[4],   // 32px
      tablet: spacing[6],   // 48px
      desktop: spacing[8],  // 64px
    },
  },
} as const;

// ========================================
// COMPONENT SIZES
// ========================================

export const sizes = {
  button: {
    sm: {
      height: '32px',
      paddingX: spacing[3],
      paddingY: spacing[1],
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '40px',
      paddingX: spacing[4],
      paddingY: spacing[2],
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '48px',
      paddingX: spacing[6],
      paddingY: spacing[3],
      fontSize: typography.fontSize.lg,
    },
  },
  
  input: {
    sm: {
      height: '32px',
      paddingX: spacing[3],
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: '40px',
      paddingX: spacing[4],
      fontSize: typography.fontSize.base,
    },
    lg: {
      height: '48px',
      paddingX: spacing[4],
      fontSize: typography.fontSize.lg,
    },
  },
  
  icon: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
  },
} as const;

// ========================================
// PLATFORM COLORS
// ========================================

export const platformColors = {
  linkedin: colors.calypso[500],
  facebook: '#1877f2',
  instagram: '#e4405f',
  twitter: '#1da1f2',
  youtube: '#ff0000',
  email: colors.tulip[500],
  website: colors.pistachio[500],
} as const;

// ========================================
// STATUS COLORS
// ========================================

export const statusColors = {
  drafting: colors.neutral[400],
  inProgress: colors.calypso[500],
  needsReview: colors.tulip[500],
  approved: colors.pistachio[600],
  scheduled: colors.calypso[300],
  published: colors.pistachio[500],
  archived: colors.neutral[300],
} as const;

// ========================================
// PRIORITY COLORS
// ========================================

export const priorityColors = {
  low: colors.pistachio[500],
  medium: colors.tulip[500],
  high: '#dc2626',
  urgent: '#991b1b',
} as const;

// ========================================
// EXPORT ALL TOKENS
// ========================================

export const tokens = {
  colors,
  gradients,
  glass,
  spacing,
  radius,
  shadows,
  typography,
  breakpoints,
  zIndex,
  transitions,
  layout,
  sizes,
  platformColors,
  statusColors,
  priorityColors,
} as const;

export type Tokens = typeof tokens;
export default tokens;
