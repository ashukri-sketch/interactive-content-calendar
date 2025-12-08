/**
 * RESPONSIVE HOOK
 * Detects current breakpoint and provides responsive utilities
 */

import { useState, useEffect } from 'react';
import { tokens } from '../tokens';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    breakpoint: 'lg',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpoint: Breakpoint = 'xs';
      if (width >= parseInt(tokens.breakpoints['2xl'])) breakpoint = '2xl';
      else if (width >= parseInt(tokens.breakpoints.xl)) breakpoint = 'xl';
      else if (width >= parseInt(tokens.breakpoints.lg)) breakpoint = 'lg';
      else if (width >= parseInt(tokens.breakpoints.md)) breakpoint = 'md';
      else if (width >= parseInt(tokens.breakpoints.sm)) breakpoint = 'sm';
      
      const isMobile = width < parseInt(tokens.breakpoints.md);
      const isTablet = width >= parseInt(tokens.breakpoints.md) && width < parseInt(tokens.breakpoints.lg);
      const isDesktop = width >= parseInt(tokens.breakpoints.lg);

      setState({
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
        width,
        height,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return state;
}

// Utility function for responsive values
export function useResponsiveValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T | undefined {
  const { breakpoint } = useResponsive();
  
  // Return the value for current breakpoint or closest smaller
  if (breakpoint === '2xl' && values['2xl']) return values['2xl'];
  if ((breakpoint === '2xl' || breakpoint === 'xl') && values.xl) return values.xl;
  if ((breakpoint === '2xl' || breakpoint === 'xl' || breakpoint === 'lg') && values.lg) return values.lg;
  if (values.md) return values.md;
  if (values.sm) return values.sm;
  return values.xs;
}
