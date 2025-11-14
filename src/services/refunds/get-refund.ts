import { api } from '@/lib/api';
import type { Refund } from '@/types/refund';

interface GetRefundResponse {
  refund: Refund;
}

export async function getRefund(id: string | undefined) {
  const response = await api.get<GetRefundResponse>(`/refunds/${id}`, {});

  return response.data;
}
