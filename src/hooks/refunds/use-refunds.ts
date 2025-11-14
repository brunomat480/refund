import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';

import { getRefunds } from '@/services/refunds/get-refunds';

export function useRefunds() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [q, setQ] = useQueryState('q', { defaultValue: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['refunds', q, page],
    queryFn: () => getRefunds({ q, page }),
  });

  return {
    refunds: data?.refunds.data || [],
    meta: data?.refunds.meta || null,
    isLoadingRefunds: isLoading,
    filters: {
      page,
      setPage,
      q,
      setQ,
    },
  };
}
