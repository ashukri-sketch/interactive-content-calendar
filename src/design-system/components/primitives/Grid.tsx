/**
 * GRID PRIMITIVE
 * Responsive grid layout component
 * Auto Layout: CSS Grid with responsive columns
 */

import { ReactNode, CSSProperties } from 'react';
import { tokens } from '../../tokens';

type SpacingKey = keyof typeof tokens.spacing;

interface GridProps {
  children: ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: SpacingKey;
  gapX?: SpacingKey;
  gapY?: SpacingKey;
  className?: string;
  style?: CSSProperties;
}

export function Grid({
  children,
  columns = 1,
  gap,
  gapX,
  gapY,
  className = '',
  style = {},
}: GridProps) {
  // Handle responsive columns
  const getGridColumns = () => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }
    
    const classes: string[] = [];
    if (columns.xs) classes.push(`grid-cols-${columns.xs}`);
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    
    return classes.join(' ');
  };

  const gapValue = gap ? tokens.spacing[gap] : undefined;
  const gapXValue = gapX ? tokens.spacing[gapX] : undefined;
  const gapYValue = gapY ? tokens.spacing[gapY] : undefined;

  return (
    <div
      className={`
        grid
        ${getGridColumns()}
        ${className}
      `}
      style={{
        gap: gapValue,
        columnGap: gapXValue,
        rowGap: gapYValue,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
