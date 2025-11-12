import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cx } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { Card } from '@/components/card';

export const Dialog = DialogPrimitive.Dialog;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cx('fixed inset-0 z-50 bg-gray-100/60', className)}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cx(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          className
        )}
        {...props}
      >
        <Card>{children}</Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
