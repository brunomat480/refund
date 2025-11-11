import { Card } from '@/components/card';
import Container from '@/components/container';
import Divider from '@/components/divider';
import { RefundRequest } from '@/components/refund-request';
import { Search } from '@/components/search';
import { Text } from '@/components/text';

export function HomePage() {
  return (
    <Container>
      <Card className="mx-auto max-w-270.5 space-y-6">
        <Text as="h1" variant="heading" className="text-gray-100">
          Solicitações
        </Text>

        <Search />

        <Divider orientation="horizontal" className="" />

        <div>
          <RefundRequest />
        </div>
      </Card>
    </Container>
  );
}
