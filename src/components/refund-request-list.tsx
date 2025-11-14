import type { ComponentProps } from 'react';

import { RefundRequest } from '@/components/refund-request';
import type { Category, Refund } from '@/types/refund';

interface RefundRequestListProps extends ComponentProps<'div'> {
  refunds: {
    id: string;
    title: string;
    category: Category;
    value: number;
  }[];
  loading?: boolean;
}

export function RefundRequestList({
  refunds,
  loading,
  ...props
}: RefundRequestListProps) {
  return (
    <div className="space-y-4" {...props}>
      {refunds.map((refund) => (
        <RefundRequest key={refund.id} refund={refund} />
      ))}

      {loading &&
        Array.from({ length: 6 }).map((_, index) => (
          <RefundRequest
            key={`refund-loading-${index}`}
            refund={{} as Refund}
            loading={loading}
          />
        ))}
    </div>
  );
}
