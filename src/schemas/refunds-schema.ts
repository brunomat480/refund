import { z } from 'zod';

import { Category } from '@/types/refund';

export const refundNewFormSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório').max(255),
  category: z.enum(Category, 'Escolha uma categoria'),
  value: z.string().min(1, 'Campo obrigatório'),
  receiptFile: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: 'Campo obrigatório',
  }),
});

export type refundNewFormType = z.infer<typeof refundNewFormSchema>;
