import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { Text } from '@/components/text';

export const inputVariants = cva(
  ' w-full rounded-lg border border-gray-300 text-sm outline-none hover:transition hover:duration-200 focus:border-[1.5px] focus:border-green-100 disabled:opacity-50',
  {
    variants: {
      size: {
        md: 'h-12 px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface InputProps
  extends Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
}

export function Input({ size, className, label, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <Text as="label" variant="label" htmlFor={props.name}>
          {label}
        </Text>
      )}
      <input
        id={props.name}
        className={inputVariants({ size, className })}
        {...props}
      />
    </div>
  );
}
