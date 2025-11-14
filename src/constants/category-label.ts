import type { CategoryEnum } from '@/schemas/refunds-schema';

export const CategoryLabel: Record<CategoryEnum, string> = {
  food: 'Alimentação',
  hosting: 'Hospedagem',
  transport: 'Transporte',
  services: 'Serviços',
  other: 'Outros',
};
