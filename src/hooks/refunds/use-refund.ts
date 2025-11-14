import { useQuery } from '@tanstack/react-query';

import {
  createRefund,
  type CreateRefundBody,
} from '@/services/refunds/create-refund';
import { getRefund } from '@/services/refunds/get-refund';

export function useRefund(id?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['refund', id],
    queryFn: () => getRefund(id),
    enabled: !!id,
  });

  async function createNewRefund({
    title,
    category,
    value,
    receipt,
  }: CreateRefundBody) {
    await createRefund({
      title,
      category,
      value,
      receipt,
    });
  }

  return {
    refund: data?.refund,
    isLoadingRefund: isLoading,
    createNewRefund,
  };
}
