import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ReactNode } from 'react';

export const containerVariants = cva('mx-auto', {
  variants: {
    size: {
      md: 'max-w-lg px-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ContainerProps extends VariantProps<typeof containerVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}

export default function Container({
  as = 'div',
  children,
  className,
  size,
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: containerVariants({ size, className }),
    },
    children
  );
}
