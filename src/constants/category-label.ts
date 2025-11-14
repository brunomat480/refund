import { Category } from '@/types/refund';

export const CategoryLabel: Record<Category, string> = {
  [Category.FOOD]: 'Alimentação',
  [Category.HOSTING]: 'Hospedagem',
  [Category.TRANSPORT]: 'Transporte',
  [Category.SERVICES]: 'Serviços',
  [Category.OTHER]: 'Outros',
};
