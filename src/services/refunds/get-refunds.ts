import { api } from '@/lib/api';
import type { BaseResponse, Refund } from '@/types/refund';

interface GetRefundsQuery {
  q: string;
  page: number;
}

interface GetRefundsResponse {
  refunds: BaseResponse<Refund>;
}

export async function getRefunds({ q, page }: GetRefundsQuery) {
  const response = await api.get<GetRefundsResponse>('/refunds', {
    params: {
      q,
      page,
    },
  });

  return response.data;
}
