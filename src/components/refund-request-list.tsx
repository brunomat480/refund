import type { ComponentProps } from 'react';

import { RefundRequest } from '@/components/refund-request';

interface RefundRequestListProps extends ComponentProps<'div'> {
  refunds: {
    id: string;
    title: string;
    category: string;
    value: number;
  }[];
}

export function RefundRequestList({
  refunds,
  ...props
}: RefundRequestListProps) {
  return (
    <div className="space-y-4" {...props}>
      {refunds.map((refund) => (
        <RefundRequest key={refund.id} refund={refund} />
      ))}
    </div>
  );
}
