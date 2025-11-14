import { createSerializer, parseAsString } from 'nuqs';
import type { ComponentProps } from 'react';
import { Link } from 'react-router';

import CaretIcon from '@/assets/icons/caret.svg?react';
import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { useRefunds } from '@/hooks/refunds/use-refunds';

const toSearchParams = createSerializer({
  q: parseAsString,
});

interface PaginationProps extends ComponentProps<'div'> {}

export function Pagination({ ...props }: PaginationProps) {
  const { meta, isLoadingRefunds, filters } = useRefunds();

  const params = toSearchParams({ q: filters.q || null });

  const fixed = params.replace('?', '&');

  return (
    <div
      className="flex min-w-26.5 items-center justify-center gap-1.5"
      {...props}
    >
      <div className="flex min-w-26.5 items-center justify-between">
        <Button
          asChild
          size="sm"
          disabled={isLoadingRefunds || meta!.currentPage <= 1}
        >
          <Link to={`${meta?.previousPageUrl}${fixed}` || ''}>
            <CaretIcon className="size-6 rotate-180 select-none" />
          </Link>
        </Button>
        <Text variant="body" className="select-none">
          {isLoadingRefunds ? (
            <Skeleton className="h-5 w-[1.323125rem]" />
          ) : (
            `${meta?.currentPage}/${meta?.lastPage}`
          )}
        </Text>
        <Button
          size="sm"
          disabled={isLoadingRefunds || meta!.currentPage >= meta!.lastPage}
        >
          <Link to={`${meta?.nextPageUrl}${fixed}` || ''}>
            <CaretIcon className="size-6 select-none" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
