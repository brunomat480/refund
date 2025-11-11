import ForkKnifeIcon from '@/assets/icons/fork-knife.svg?react';
import { Skeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

interface RefundRequestProps {
  loading?: boolean;
}

export function RefundRequest({ loading }: RefundRequestProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {!loading ? (
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-400 p-2">
            <ForkKnifeIcon className="size-4.5 fill-green-100" />
          </div>
        ) : (
          <Skeleton rounded="full" className="size-8" />
        )}
        <div className="flex flex-col">
          {!loading ? (
            <>
              <Text as="strong" variant="medium-bold" className="text-gray-100">
                Rodrigo
              </Text>
              <Text as="small" variant="small">
                Alimentação
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
          <Text variant="medium-semibold">34,78</Text>
        </span>
      ) : (
        <Skeleton className="h-6 w-12" />
      )}
    </div>
  );
}
