import { api } from '@/lib/api';

export async function deleteRefund(id: string | undefined) {
  await api.delete(`/refunds/${id}`);
}
