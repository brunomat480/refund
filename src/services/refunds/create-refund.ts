import { api } from '@/lib/api';
import type { Refund } from '@/types/refund';

export interface CreateRefundBody {
  title: string;
  category: 'food' | 'hosting' | 'transport' | 'services' | 'other';
  value: number;
  receipt: string;
}

interface CreateRefundResponse {
  refunds: Refund;
}

export async function createRefund({
  title,
  category,
  value,
  receipt,
}: CreateRefundBody) {
  const response = await api.post<CreateRefundResponse>('/refunds', {
    title,
    category,
    value,
    receipt,
  });

  return response.data;
}
