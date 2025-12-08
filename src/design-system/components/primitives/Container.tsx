/**
 * CONTAINER PRIMITIVE
 * Responsive container with max-width constraints
 * Auto Layout: Flexbox with proper padding and constraints
 */

import { ReactNode } from 'react';
import { tokens } from '../../tokens';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: keyof typeof tokens.layout.maxWidth;
  padding?: boolean;
  className?: string;
}

export function Container({ 
  children, 
  maxWidth = '7xl',
  padding = true,
  className = '' 
}: ContainerProps) {
  return (
    <div
      className={`
        w-full mx-auto
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `}
      style={{
        maxWidth: tokens.layout.maxWidth[maxWidth],
      }}
    >
      {children}
    </div>
  );
}
