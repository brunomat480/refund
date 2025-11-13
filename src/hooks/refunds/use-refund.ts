import { useMutation } from '@tanstack/react-query';

import { createRefund } from '@/services/refunds/create-refund';

export function useRefund() {
  const { mutateAsync: createRefundFn, isPending: isCreatingRefund } =
    useMutation({
      mutationFn: createRefund,
    });

  return {
    createRefund: createRefundFn,
    isCreatingRefund,
  };
}
