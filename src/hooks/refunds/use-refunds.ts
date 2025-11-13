import { useQuery } from '@tanstack/react-query';

import { getRefunds } from '@/services/refunds/get-refunds';

export function useRefunds(q?: string, page?: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['refunds', q, page],
    queryFn: () => getRefunds({ q: '', page: 1 }),
  });

  return {
    refunds: data?.refunds.data || [],
    meta: data?.refunds.meta || null,
    isLoadingRefunds: isLoading,
  };
}
