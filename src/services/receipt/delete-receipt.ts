import { api } from '@/lib/api';

export async function deleteReceipt(id: string | undefined) {
  await api.delete(`/receipts/${id}`);
}
