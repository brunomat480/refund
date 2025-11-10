import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export const cardVariants = cva('rounded-2xl bg-gray-500 shadow-sm', {
  variants: {
    size: {
      md: 'p-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface CardProps
  extends VariantProps<typeof cardVariants>,
    React.ComponentProps<'div'> {
  as?: keyof React.JSX.IntrinsicElements;
}

export function Card({ as = 'div', size, children, className }: CardProps) {
  return React.createElement(
    as,
    {
      className: cardVariants({ size, className }),
    },
    children
  );
}
