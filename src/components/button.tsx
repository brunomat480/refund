import { cva, type VariantProps } from 'class-variance-authority';
import {
  cloneElement,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import { Text } from '@/components/text';

export const buttonVariants = cva(
  'flex items-center justify-center rounded-lg cursor-pointer gap-2 select-none hover:transition hover:duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-green-100 text-sm font-bold text-white hover:bg-green-200 fill-white',
        link: 'bg-transparent text-gray-200 text-sm font-semibold hover:text-green-100 active:text-gray-100 fill-gray-200 hover:fill-green-100 active:fill-green-100',
      },
      size: {
        sm: 'size-8 p-1',
        md: 'h-12 px-5 py-3.5',
        icon: 'size-12 p-3',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  }
);

interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  asChild?: boolean;
  textVariant?: VariantProps<typeof Text>['variant'];
}

function hasPropsWithClassName(
  child: ReactNode
): child is ReactElement<{ className?: string }> {
  return isValidElement(child);
}

export function Button({
  children,
  className,
  asChild,
  variant,
  disabled,
  size,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, disabled, className });

  if (asChild && hasPropsWithClassName(children)) {
    return cloneElement(children, {
      ...props,
      className: [classes, children.props.className].filter(Boolean).join(' '),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
