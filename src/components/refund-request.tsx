import { Link } from 'react-router';

import BedIcon from '@/assets/icons/bed.svg?react';
import ForkKnifeIcon from '@/assets/icons/fork-knife.svg?react';
import PoliceCarIcon from '@/assets/icons/police-car.svg?react';
import ReceipIcon from '@/assets/icons/receipt.svg?react';
import WrenchIcon from '@/assets/icons/wrench.svg?react';
import { Skeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { CategoryLabel } from '@/constants/category-label';
import type { Category } from '@/types/refund';
import { formatCurrency } from '@/utils/format-currency';

interface RefundRequestProps {
  loading?: boolean;
  refund: {
    id: string;
    title: string;
    category: Category;
    value: number;
  };
}

const IconMap = {
  food: ForkKnifeIcon,
  hosting: BedIcon,
  transport: PoliceCarIcon,
  services: WrenchIcon,
  other: ReceipIcon,
};

export function RefundRequest({ refund, loading }: RefundRequestProps) {
  const Icon = IconMap[refund.category];

  return (
    <Link
      to={`/refund/details/${refund?.id}`}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        {!loading ? (
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-400 p-2">
            {Icon ? <Icon className="size-4.5 fill-green-100" /> : null}
          </div>
        ) : (
          <Skeleton rounded="full" className="size-8" />
        )}
        <div className="flex flex-col">
          {!loading ? (
            <>
              <Text as="strong" variant="medium-bold" className="text-gray-100">
                {refund?.title}
              </Text>
              <Text as="small" variant="small">
                {CategoryLabel[refund.category]}
              </Text>
            </>
          ) : (
            <div className="space-y-0.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-2 w-14" />
            </div>
          )}
        </div>
      </div>

      {!loading ? (
        <span className="space-x-1">
          <Text as="small" variant="small">
            R$
          </Text>
          <Text variant="medium-semibold" className="text-gray-100">
            {formatCurrency(refund?.value)}
          </Text>
        </span>
      ) : (
        <Skeleton className="h-6 w-12" />
      )}
    </Link>
  );
}
