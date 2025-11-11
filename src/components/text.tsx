import { cva, type VariantProps } from 'class-variance-authority';
import type { as } from 'node_modules/react-router/dist/development/instrumentation-iAqbU5Q4';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const textVariants = cva('font-sans text-gray-200', {
  variants: {
    variant: {
      heading: 'font-bold text-xl',
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

type TextProps<T extends keyof React.JSX.IntrinsicElements = 'span'> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof textVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, 'className'>;

export function Text<T extends keyof React.JSX.IntrinsicElements = 'span'>({
  as,
  className,
  variant,
  children,
  ...props
}: TextProps<T>) {
  const Component = (as || 'span') as React.ElementType;

  return (
    <Component
      className={twMerge(textVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
