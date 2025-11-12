import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { RefundForm } from '@/components/refund-form';
import { Text } from '@/components/text';

export function RefundNewPage() {
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

        <RefundForm />
      </Card>
    </Container>
  );
}
