import {
  createRefund,
  type CreateRefundBody,
} from '@/services/refunds/create-refund';

export function useRefund() {
  async function createNewRefund({
    title,
    category,
    value,
    receipt,
  }: CreateRefundBody) {
    await createRefund({
      title,
      category,
      value,
      receipt,
    });
  }

  return {
    createNewRefund,
  };
}
