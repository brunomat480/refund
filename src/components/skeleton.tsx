import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export const skeletonVariants = cva(
  'animate-pulse bg-gray-300 pointer-events-none',
  {
    variants: {
      rounded: {
        lg: 'rounded-lg',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      rounded: 'lg',
    },
  }
);

interface SkeletonProps
  extends VariantProps<typeof skeletonVariants>,
    React.ComponentProps<'div'> {}

export function Skeleton({ rounded, className, ...props }: SkeletonProps) {
  return (
    <div className={skeletonVariants({ rounded, className })} {...props} />
  );
}
