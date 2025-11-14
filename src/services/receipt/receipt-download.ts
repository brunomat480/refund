import { api } from '@/lib/api';

interface ReceiptDownloadResponse {
  url: string;
}

export async function receiptDownload(id: string | undefined) {
  const response = await api.get<ReceiptDownloadResponse>(
    `/receipts/download/${id}`
  );

  return response.data;
}
