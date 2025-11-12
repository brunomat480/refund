import type { ChangeEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputFile } from '@/components/input-file';
import { SelectCategories } from '@/components/select-categories';

export function NewRefundForm() {
  const form = useForm();

  function formatCurrency(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, '');
    const numericValue = parseInt(value, 10) / 100;

    if (!value || numericValue === 0) {
      event.target.value = '';
      return;
    }

    event.target.value = numericValue.toFixed(2).replace('.', ',');
  }

  return (
    <FormProvider {...form}>
      <form className="mt-10 space-y-6">
        <Input label="NOME DA SOLICITAÇÃO" {...form.register('name_refund')} />

        <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
          <SelectCategories />

          <Input
            label="VALOR"
            placeholder="0,00"
            className="sm:max-w-38.5"
            {...form.register('amount', {
              onChange: formatCurrency,
            })}
          />
        </div>

        <InputFile allowedExtensions={['pdf']} maxFileSizeInMB={5} />

        <Button disabled type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </FormProvider>
  );
}
