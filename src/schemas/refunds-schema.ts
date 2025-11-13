import { z } from 'zod';

export const refundNewFormSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório').max(255),
  category: z.enum(
    ['food', 'hosting', 'transport', 'services', 'other'],
    'Escolha uma categoria'
  ),
  value: z.string().min(1, 'Campo obrigatório'),
  receiptFile: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: 'Campo obrigatório',
  }),
  // receipt: z.uuid().optional(),
});

export type refundNewFormType = z.infer<typeof refundNewFormSchema>;
