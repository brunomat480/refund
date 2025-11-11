import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export const textVariants = cva('font-sans text-gray-200', {
  variants: {
    variant: {
      heading: 'font-bold text-2xl',
      subtitle: 'font-bold text-xl',
      body: 'text-sm font-normal',
      label: 'text-[0.625rem] font-normal',
      'medium-bold': 'text-sm font-bold',
      'medium-semibold': 'text-sm font-semibold',
      small: 'font-normal text-xs',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export function Text({
  as = 'span',
  className,
  variant,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children
  );
}
