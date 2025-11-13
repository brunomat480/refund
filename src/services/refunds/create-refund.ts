import { api } from '@/lib/api';
import type { refundNewFormType } from '@/schemas/refunds-schema';
import type { Refund } from '@/types/refund';

interface CreateRefundResponse {
  refunds: Refund;
}

export async function createRefund({
  title,
  category,
  value,
}: refundNewFormType) {
  const response = await api.post<CreateRefundResponse>('/refunds', {
    title,
    category,
    value,
  });

  return response.data;
}
