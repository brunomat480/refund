import { api } from '@/lib/api';
import type { Receipt } from '@/types/receipt';

export interface CreateReceiptBody {
  receiptFile: File;
}

interface CreateReceiptResponse {
  receipt: Receipt;
}

export async function createReceipt({ receiptFile }: CreateReceiptBody) {
  const response = await api.post<CreateReceiptResponse>(
    '/receipts',
    {
      receiptFile,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}
