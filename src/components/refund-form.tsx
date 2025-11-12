import type { ChangeEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FileIcon from '@/assets/icons/file.svg?react';
import { Button } from '@/components/button';
import { Input, inputWrapperVariants } from '@/components/input';
import { InputFile } from '@/components/input-file';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { Text } from '@/components/text';

const options = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'hospedagem', label: 'Hospedagem' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'outros', label: 'Outros' },
];

interface RefundFormProps {
  view?: boolean;
}

export function RefundForm({ view }: RefundFormProps) {
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
        <Input
          label="NOME DA SOLICITAÇÃO"
          disabled={view}
          {...form.register('name_refund')}
        />

        <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
          <div className={inputWrapperVariants()}>
            <Text
              as="label"
              variant="label"
              htmlFor="category"
              className="group-focus-within:text-green-100"
            >
              CATEGORIA
            </Text>
            <Select>
              <SelectTrigger disabled={view} id="category">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            label="VALOR"
            placeholder="0,00"
            disabled={view}
            className="sm:max-w-38.5"
            {...form.register('amount', {
              onChange: formatCurrency,
            })}
          />
        </div>

        {view ? (
          <Button
            variant="link"
            className="group mx-auto text-green-100 hover:text-green-200"
          >
            <FileIcon className="size-4.5 stroke-green-100 stroke-12 group-hover:stroke-green-200" />
            Abrir comprovante
          </Button>
        ) : (
          <InputFile
            disabled={view}
            allowedExtensions={['pdf']}
            maxFileSizeInMB={5}
          />
        )}

        {view ? (
          <Button className="w-full">Excluir</Button>
        ) : (
          <Button disabled type="submit" className="w-full">
            Enviar
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
