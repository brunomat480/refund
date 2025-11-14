import { type ComponentProps, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CloudArrowUpIcon from '@/assets/icons/cloud-arrow-up.svg?react';
import { Button } from '@/components/button';
import { inputVariants } from '@/components/input';
import { Text } from '@/components/text';

interface InputFileProps extends ComponentProps<'input'> {
  allowedExtensions: string[];
  maxFileSizeInMB: number;
  error?: string | undefined;
}

export function InputFile({
  allowedExtensions,
  maxFileSizeInMB,
  disabled,
  error,
  ...props
}: InputFileProps) {
  const { control } = useFormContext();
  const formValues = useWatch({ control });
  const name = props.name || '';
  const fileName = formValues[name]?.[0]?.name || '';
  const formFile: File = useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  );

  const { fileExtension, fileSize } = useMemo(
    () => ({
      fileExtension: formFile?.name.split('.').pop()?.toLowerCase() || '',
      fileSize: formFile?.size || 0,
    }),
    [formFile]
  );

  const isValidExtension = allowedExtensions.includes(fileExtension);
  const isValidSize = fileSize <= maxFileSizeInMB * 1024 * 1024;

  return (
    <div>
      <Text as="label" variant="label" htmlFor="receipt">
        COMPROVANTE
      </Text>

      <label
        data-error={
          (formFile && (!isValidExtension || !isValidSize)) ||
          (!formFile && !!error)
        }
        className={inputVariants({
          disabled,
          className: 'relative mt-2 block w-full overflow-hidden',
        })}
      >
        <input
          type="file"
          id="receipt"
          className="absolute top-0 right-0 z-10 h-full w-full rounded-lg bg-transparent text-transparent not-disabled:cursor-pointer"
          {...props}
        />

        {fileName && (
          <Text className="absolute top-1/2 -translate-y-1/2">{fileName}</Text>
        )}

        <Button type="button" size="icon" className="absolute top-0 right-0">
          <CloudArrowUpIcon className="size-6" />
        </Button>
      </label>

      {fileName && (
        <div className="mt-1.5 space-y-1">
          {formFile && !isValidExtension && isValidSize && (
            <Text as="p" variant="small" className="text-red-500">
              A Extensão deve ser .pdf
            </Text>
          )}

          {formFile && !isValidSize && isValidExtension && (
            <Text variant="small" className="text-red-500">
              O arquivo deve ter no máximo {maxFileSizeInMB}MB
            </Text>
          )}

          {formFile && !isValidExtension && !isValidSize && (
            <Text variant="small" className="text-red-500">
              A Extensão deve ser .pdf e o tamanho deve ser {maxFileSizeInMB}MB
            </Text>
          )}
        </div>
      )}

      {error && (
        <Text variant="small" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
}
