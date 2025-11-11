import type { ComponentProps } from 'react';

import { RefundRequest } from '@/components/refund-request';

interface RefundRequestListProps extends ComponentProps<'div'> {}

export function RefundRequestList({ ...props }: RefundRequestListProps) {
  return (
    <div className="space-y-4" {...props}>
      <RefundRequest />
      <RefundRequest />
      <RefundRequest />
    </div>
  );
}
