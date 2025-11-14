import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { type ChangeEvent, useEffect, useTransition } from 'react';
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
import { Skeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { useRefund } from '@/hooks/refunds/use-refund';
import {
  refundNewFormSchema,
  type refundNewFormType,
} from '@/schemas/refunds-schema';
import { createReceipt } from '@/services/receipt/create-receipt';
import { deleteReceipt } from '@/services/receipt/delete-receipt';
import { receiptDownload } from '@/services/receipt/receipt-download';
import { deleteRefund } from '@/services/refunds/delete-refund';
import { Category } from '@/types/refund';
import { formatCurrency } from '@/utils/format-currency';

import { env } from '../../env';

const options = [
  { value: 'food', label: 'Alimentação' },
  { value: 'hosting', label: 'Hospedagem' },
  { value: 'transport', label: 'Transporte' },
  { value: 'services', label: 'Serviços' },
  { value: 'other', label: 'Outros' },
];

interface RefundFormProps {
  view?: boolean;
  refund?: {
    id: string | undefined;
    title: string | undefined;
    category: string | undefined;
    value: number | undefined;
    receiptId: string | undefined;
  };
  loading?: boolean;
}

export function RefundForm({ view, refund, loading }: RefundFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { createNewRefund } = useRefund();

  const [isCreatingRefund, setIsCreatingRefund] = useTransition();
  const [isDownloadFile, setIsDownloadFile] = useTransition();
  const [isDeleteRefund, setIsDeleteRefund] = useTransition();

  const form = useForm<refundNewFormType>({
    resolver: zodResolver(refundNewFormSchema),
  });

  useEffect(() => {
    if (view && refund) {
      form.setValue('title', refund.title || '');
      form.setValue('category', refund.category as Category);
      form.setValue('value', formatCurrency(refund.value || 0) || '');
    }
  }, [refund, form, view]);

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
    const valueConvertNumber = Number(
      value.replaceAll(/\./g, '').replace(',', '.')
    );

    setIsCreatingRefund(async () => {
      try {
        const createReceiptResponse = await createReceipt({
          receiptFile: receiptFile[0],
        });

        await createNewRefund({
          title,
          category,
          value: valueConvertNumber,
          receipt: createReceiptResponse.receipt.id,
        });

        form.reset();
        queryClient.invalidateQueries({ queryKey: ['refunds'] });
        navigate('/refund/success');
      } catch {
        toast.error('Erro ao solicitar reembolso, tente novamente!');
      }
    });
  }

  function handleReceiptDownload() {
    setIsDownloadFile(async () => {
      try {
        const receiptFileResponse = await receiptDownload(refund?.receiptId);

        open(`${env.VITE_BASE_URL_API}${receiptFileResponse.url}`, '_blank');
      } catch {
        toast.error('Erro ao tentar abrir comprovante, tente novamente!');
      }
    });
  }

  async function handleDeleteRefund() {
    setIsDeleteRefund(async () => {
      try {
        await deleteReceipt(refund?.receiptId);
        await deleteRefund(refund?.id);

        queryClient.invalidateQueries({ queryKey: ['refunds'] });
        navigate('/');
      } catch {
        toast.error(
          'Erro ao tentar deletar a solicitação de reembolso, tente novamente!'
        );
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateRefund)}
        className="mt-10 space-y-6"
      >
        <div className="relative">
          <Input
            label="NOME DA SOLICITAÇÃO"
            disabled={view || isCreatingRefund}
            error={titleError}
            {...form.register('title')}
          />

          {loading && (
            <Skeleton className="absolute right-0 bottom-0 left-0 h-12" />
          )}
        </div>

        <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
          <div className={inputWrapperVariants({ className: 'relative' })}>
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
                  value={field.value || ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="category"
                    data-error={!!categoryError}
                    disabled={view || isCreatingRefund}
                    className="disabled:opacity-50 data-[error=true]:border-red-500"
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

            {loading && (
              <Skeleton className="absolute right-0 bottom-0 left-0 h-12" />
            )}
          </div>
          <div className="relative w-full">
            <Input
              label="VALOR"
              placeholder="0,00"
              disabled={view || isCreatingRefund}
              autoComplete="off"
              className="sm:max-w-38.5"
              error={valueError}
              {...form.register('value', {
                onChange: handleValue,
              })}
            />

            {loading && (
              <Skeleton className="absolute right-0 bottom-0 left-0 h-12" />
            )}
          </div>
        </div>

        {view ? (
          !loading ? (
            <Button
              type="button"
              variant="link"
              disabled={isCreatingRefund || isDownloadFile}
              onClick={handleReceiptDownload}
              className="group mx-auto"
            >
              {!isDownloadFile ? (
                <FileIcon className="size-4.5 stroke-gray-200 stroke-12 group-hover:stroke-green-100 group-active:stroke-green-100" />
              ) : (
                <CircleNotchIcon className="size-4.5 animate-spin stroke-gray-200 stroke-12" />
              )}
              Abrir comprovante
            </Button>
          ) : (
            <Skeleton className="mx-auto h-4 w-full max-w-56" />
          )
        ) : (
          <InputFile
            allowedExtensions={['pdf']}
            maxFileSizeInMB={5}
            error={receiptFileError}
            {...form.register('receiptFile')}
          />
        )}

        {view ? (
          !loading ? (
            <RefundRequestDeleteModal
              loading={isDeleteRefund}
              onDeleteRefund={handleDeleteRefund}
            >
              <Button type="button" className="w-full">
                Excluir
              </Button>
            </RefundRequestDeleteModal>
          ) : (
            <Skeleton className="h-12 w-full" />
          )
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
