import {
  createReceipt,
  type CreateReceiptBody,
} from '@/services/receipt/create-receipt';
import { deleteReceipt } from '@/services/receipt/delete-receipt';

export function useReceipt() {
  async function createNewReceipt({ receiptFile }: CreateReceiptBody) {
    const createReceiptResponse = await createReceipt({ receiptFile });

    return createReceiptResponse;
  }

  async function deleteReceiptFn(id: string) {
    await deleteReceipt(id);
  }

  return {
    createNewReceipt,
    deleteReceipt: deleteReceiptFn,
  };
}
