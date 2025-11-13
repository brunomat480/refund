import * as SelectPrimitive from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import CaretIcon from '@/assets/icons/caret.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import { inputVariants } from '@/components/input';

export const Select = SelectPrimitive.Root;

interface SelectTriggerProps
  extends ComponentProps<typeof SelectPrimitive.Trigger> {
  children: ReactNode;
}

export const SelectTrigger = ({ children, ...props }: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={inputVariants({
      className:
        'flex items-center justify-between text-gray-200 not-disabled:hover:border-green-100 [&[data-state=closed]>span>svg]:rotate-90 [&[data-state=open]>span>svg]:-rotate-90',
    })}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span>
        <CaretIcon className="h-4 w-4 fill-gray-200" />
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const SelectValue = SelectPrimitive.Value;

interface SelectContentProps
  extends ComponentProps<typeof SelectPrimitive.Content> {
  children: ReactNode;
}

export const SelectContent = ({
  children,
  className,
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cx(
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-40 data-[state=closed]:zoom-out-40 data-[state=open]:animate-in data-[state=closed]:animate-out z-50 min-w-60 rounded-lg border border-gray-300 bg-gray-500 shadow-lg',
        className
      )}
      position="popper"
      sideOffset={5}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectGroup = SelectPrimitive.Group;

interface SelectLabelProps
  extends ComponentProps<typeof SelectPrimitive.Label> {
  children: ReactNode;
}

export const SelectLabel = ({
  children,
  className,
  ...props
}: SelectLabelProps) => (
  <SelectPrimitive.Label
    className={cx(
      'px-3 py-2 text-xs font-semibold text-gray-500 uppercase',
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Label>
);

interface SelectItemProps extends ComponentProps<typeof SelectPrimitive.Item> {
  children: ReactNode;
}

export const SelectItem = ({
  children,
  className,
  ...props
}: SelectItemProps) => (
  <SelectPrimitive.Item
    className={cx(
      'relative flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-gray-100 hover:bg-gray-400 focus:bg-blue-50 focus:outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="ml-auto">
      <CheckIcon className="h-4 w-4 fill-green-100" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

export const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    className={cx('my-1 h-px bg-gray-200', className)}
    {...props}
  />
);
