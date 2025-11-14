import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { Text } from '@/components/text';

export const inputVariants = cva(
  'font-sans font-normal w-full border border-gray-300 text-sm outline-none hover:transition hover:duration-200 focus:border-[1.5px] focus:border-green-100 placeholder:text-gray-200 data-[error=true]:border-red-500',
  {
    variants: {
      size: {
        md: 'h-12 px-4 rounded-lg',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

export const inputWrapperVariants = cva('group flex w-full flex-col gap-2');

interface InputProps
  extends Omit<ComponentProps<'input'>, 'size' | 'disabled'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string | undefined;
}

export function Input({
  size,
  className,
  label,
  disabled,
  error,
  ...props
}: InputProps) {
  return (
    <div className={inputWrapperVariants({ className })}>
      {label && (
        <Text
          as="label"
          data-disabled={disabled}
          variant="label"
          htmlFor={props.name}
          className="group-focus-within:text-green-100 data-[disabled=true]:pointer-events-none"
        >
          {label}
        </Text>
      )}
      <input
        data-error={!!error}
        id={props.name}
        className={inputVariants({ size, disabled })}
        {...props}
      />

      {error && (
        <Text variant="small" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
}
