import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import Container from '@/components/container';
import { Input } from '@/components/input';
import { InputFile } from '@/components/input-file';
import { Text } from '@/components/text';

export function RefundNewPage() {
  const form = useForm();

  return (
    <Container>
      <Card className="mx-auto max-w-lg">
        <div className="space-y-3">
          <Text as="h1" variant="heading" className="text-gray-100">
            Nova solicitação de reembolso
          </Text>

          <Text as="p" variant="body">
            Dados da despesa para solicitar reembolso.
          </Text>
        </div>

        <FormProvider {...form}>
          <form className="mt-10 space-y-6">
            <Input label="NOME DA SOLICITAÇÃO" name="name_refund" />

            <div className="flex flex-wrap gap-4 sm:flex-nowrap">
              <Input
                label="CATEGORIA"
                placeholder="Selecione"
                name="category"
              />
              <Input
                label="VALOR"
                placeholder="0,00"
                className="sm:max-w-38.5"
                name="amount"
              />
            </div>

            <InputFile allowedExtensions={['pdf']} maxFileSizeInMB={5} />

            <Button disabled type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </FormProvider>
      </Card>
    </Container>
  );
}
