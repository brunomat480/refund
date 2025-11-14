import { z } from 'zod';

const categoryEnum = z.enum(
  ['food', 'hosting', 'transport', 'services', 'other'],
  'Escolha uma categoria'
);

export type CategoryEnum = z.infer<typeof categoryEnum>;

export const refundNewFormSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório').max(255),
  category: categoryEnum,
  value: z.string().min(1, 'Campo obrigatório'),
  receiptFile: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: 'Campo obrigatório',
  }),
});

export type refundNewFormType = z.infer<typeof refundNewFormSchema>;
