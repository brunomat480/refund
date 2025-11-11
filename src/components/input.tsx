import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

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
    VariantProps<typeof inputVariants> {}

export function Input({ size, className, ...props }: InputProps) {
  return <input className={inputVariants({ size, className })} {...props} />;
}
