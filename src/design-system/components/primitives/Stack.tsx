/**
 * STACK PRIMITIVE
 * Flexible layout component for vertical/horizontal stacking
 * Auto Layout: Flexbox with consistent spacing
 */

import { ReactNode, CSSProperties } from 'react';
import { tokens } from '../../tokens';

type SpacingKey = keyof typeof tokens.spacing;
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

interface StackProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: SpacingKey;
  align?: AlignItems;
  justify?: JustifyContent;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
}

const alignMap: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export function Stack({
  children,
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  style = {},
}: StackProps) {
  const gapValue = tokens.spacing[gap];
  
  return (
    <div
      className={`
        flex
        ${direction === 'row' ? 'flex-row' : 'flex-col'}
        ${alignMap[align]}
        ${justifyMap[justify]}
        ${wrap ? 'flex-wrap' : ''}
        ${className}
      `}
      style={{
        gap: gapValue,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Convenience exports
export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack {...props} direction="column" />;
}

export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack {...props} direction="row" />;
}
