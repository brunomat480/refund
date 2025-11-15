import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import MagnifyingGlassIcon from '@/assets/icons/magnifying-glass.svg?react';
import XIcon from '@/assets/icons/x.svg?react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useRefunds } from '@/hooks/refunds/use-refunds';

const searchFormSchema = z.object({
  search: z.string().max(255).optional(),
});

export type SearchFormType = z.infer<typeof searchFormSchema>;

export function Search() {
  const { filters, isLoadingRefunds } = useRefunds();

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: filters.q || '',
    },
  });

  const searchWatch = useWatch({
    control: form.control,
    name: 'search',
  });

  function handleSearch({ search }: SearchFormType) {
    filters.setQ(search || null);

    filters.setPage(null);
  }

  function handleClearSearch() {
    filters.setQ(null);
    form.reset({
      search: '',
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSearch)}
      className="flex items-center gap-3"
    >
      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Buscar solitição
        </label>
        <Input
          id="search"
          placeholder="Pesquisar pelo nome"
          {...form.register('search')}
        />
        {!!searchWatch && (
          <button
            type="button"
            className="absolute top-1/2 right-4 flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200"
            onClick={handleClearSearch}
          >
            <XIcon className="size-3 fill-gray-200" />
          </button>
        )}
      </div>

      <Button type="submit" size="icon" disabled={isLoadingRefunds}>
        <MagnifyingGlassIcon className="size-6" />
      </Button>
    </form>
  );
}
