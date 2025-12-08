/**
 * CARD COMPONENT
 * Standardized card with glass effect
 * Auto Layout: Flexbox with consistent padding
 */

import { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { tokens } from '../tokens';

type CardVariant = 'glass' | 'solid' | 'outline';
type CardSize = 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  glass: 'glass-panel',
  solid: 'bg-white dark:bg-neutral-800 shadow-lg',
  outline: 'border-2 border-neutral-200 dark:border-neutral-700',
};

const sizeStyles: Record<CardSize, string> = {
  sm: 'p-4 rounded-xl',
  md: 'p-6 rounded-2xl',
  lg: 'p-8 rounded-3xl',
};

export function Card({
  children,
  variant = 'glass',
  size = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  ...props
}: CardProps) {
  const Component = hoverable || clickable ? motion.div : 'div';
  
  const motionProps = hoverable || clickable ? {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: clickable ? { scale: 0.98 } : undefined,
  } : {};

  return (
    <Component
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${hoverable ? 'card-lift cursor-pointer' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

// Card Sub-components for structured content
export function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <h3 className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <p className={`text-sm opacity-60 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <div className={`mt-6 flex items-center gap-3 ${className}`}>
      {children}
    </div>
  );
}
