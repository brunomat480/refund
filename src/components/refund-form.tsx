import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, useTransition } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import CircleNotchIcon from '@/assets/icons/circle-notch.svg?react';
import FileIcon from '@/assets/icons/file.svg?react';
import { Button } from '@/components/button';
import { Input, inputWrapperVariants } from '@/components/input';
import { InputFile } from '@/components/input-file';
import { RefundRequestDeleteModal } from '@/components/refund-request-delete-modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { Text } from '@/components/text';
import { useReceipt } from '@/hooks/receipt/use-receipt';
import { useRefund } from '@/hooks/refunds/use-refund';
import {
  refundNewFormSchema,
  type refundNewFormType,
} from '@/schemas/refunds-schema';
import { formatCurrency } from '@/utils/format-currency';

const options = [
  { value: 'food', label: 'Alimentação' },
  { value: 'hosting', label: 'Hospedagem' },
  { value: 'transport', label: 'Transporte' },
  { value: 'services', label: 'Serviços' },
  { value: 'other', label: 'Outros' },
];

interface RefundFormProps {
  view?: boolean;
}

export function RefundForm({ view }: RefundFormProps) {
  const navigate = useNavigate();

  const { createNewRefund } = useRefund();
  const { createNewReceipt } = useReceipt();

  const [isCreatingRefund, setIsCreatingRefund] = useTransition();

  const form = useForm({
    resolver: zodResolver(refundNewFormSchema),
    defaultValues: {
      category: undefined,
    },
  });

  const titleError = form.formState.errors.title?.message;
  const categoryError = form.formState.errors.category?.message;
  const valueError = form.formState.errors.value?.message;
  const receiptFileError = form.formState.errors.receiptFile?.message;

  function handleValue(event: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = event.target.value.replace(/\D/g, '');

    if (!onlyNumbers) {
      event.target.value = '';
      return;
    }

    const value = Number(onlyNumbers) / 100;

    const formatted = formatCurrency(value);

    event.target.value = formatted;
  }

  function handleCreateRefund({
    title,
    category,
    value,
    receiptFile,
  }: refundNewFormType) {
    const valueCovertNumber = Number(value.replace(',', '.'));
    setIsCreatingRefund(async () => {
      try {
        const createReceiptResponse = await createNewReceipt({
          receiptFile: receiptFile[0],
        });

        console.log({
          title,
          category,
          value: valueCovertNumber,
          receipt: createReceiptResponse.receipt.id,
        });

        await createNewRefund({
          title,
          category,
          value: valueCovertNumber,
          receipt: createReceiptResponse.receipt.id,
        });

        form.reset();
        navigate('/refund/success');
      } catch {
        toast.error('Erro ao solicitar reembolso, tente novamente!');
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateRefund)}
        className="mt-10 space-y-6"
      >
        <Input
          label="NOME DA SOLICITAÇÃO"
          disabled={view || isCreatingRefund}
          error={titleError}
          {...form.register('title')}
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
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                >
                  <SelectTrigger
                    id="category"
                    data-error={!!categoryError}
                    disabled={view || isCreatingRefund}
                    className="data-[error=true]:border-red-500"
                  >
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
              )}
            />

            {categoryError && (
              <Text variant="small" className="text-red-500">
                {categoryError}
              </Text>
            )}
          </div>

          <Input
            label="VALOR"
            placeholder="0,00"
            disabled={view || isCreatingRefund}
            className="sm:max-w-38.5"
            error={valueError}
            {...form.register('value', {
              onChange: handleValue,
            })}
          />
        </div>

        {view ? (
          <Button type="button" variant="link" className="group mx-auto">
            <FileIcon className="size-4.5 stroke-gray-200 stroke-12 group-hover:stroke-green-100 group-active:stroke-green-100" />
            Abrir comprovante
          </Button>
        ) : (
          <InputFile
            allowedExtensions={['pdf']}
            maxFileSizeInMB={5}
            error={receiptFileError}
            {...form.register('receiptFile')}
          />
        )}

        {view ? (
          <RefundRequestDeleteModal>
            <Button type="button" className="w-full">
              Excluir
            </Button>
          </RefundRequestDeleteModal>
        ) : (
          <Button disabled={isCreatingRefund} type="submit" className="w-full">
            {isCreatingRefund ? (
              <>
                <CircleNotchIcon className="size-5 animate-spin" /> Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
