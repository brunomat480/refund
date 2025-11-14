import { useParams } from 'react-router';

import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { RefundForm } from '@/components/refund-form';
import { Text } from '@/components/text';
import { useRefund } from '@/hooks/refunds/use-refund';

export function RefundDetailsPage() {
  const { id } = useParams();
  const { refund, isLoadingRefund } = useRefund(id);

  return (
    <Container>
      <Container>
        <Card className="mx-auto max-w-lg">
          <div className="space-y-3">
            <Text as="h1" variant="heading" className="text-gray-100">
              Solicitação de reembolso
            </Text>

            <Text as="p" variant="body">
              Dados da despesa para solicitar reembolso.
            </Text>
          </div>

          <RefundForm
            view
            refund={{
              title: refund?.title,
              category: refund?.category,
              value: refund?.value,
              receiptId: refund?.receipt.id,
            }}
            loading={isLoadingRefund}
          />
        </Card>
      </Container>
    </Container>
  );
}
