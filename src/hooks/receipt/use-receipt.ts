import {
  createReceipt,
  type CreateReceiptBody,
} from '@/services/receipt/create-receipt';

export function useReceipt() {
  async function createNewReceipt({ receiptFile }: CreateReceiptBody) {
    const createReceiptResponse = await createReceipt({ receiptFile });

    return createReceiptResponse;
  }

  return {
    createNewReceipt,
  };
}
