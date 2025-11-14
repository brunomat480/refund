import { Card } from '@/components/card';
import { Container } from '@/components/container';
import Divider from '@/components/divider';
import { Pagination } from '@/components/paginations';
import { RefundRequestList } from '@/components/refund-request-list';
import { Search } from '@/components/search';
import { Text } from '@/components/text';
import { useRefunds } from '@/hooks/refunds/use-refunds';

export function HomePage() {
  const { refunds, isLoadingRefunds } = useRefunds();

  return (
    <Container>
      <Card className="mx-auto flex min-h-146 max-w-270.5 flex-col justify-between">
        <div className="space-y-6">
          <Text as="h1" variant="heading" className="text-gray-100">
            Solicitações
          </Text>
          <Search />
          <Divider orientation="horizontal" />
          <RefundRequestList refunds={refunds} loading={isLoadingRefunds} />
        </div>
        <Pagination />
      </Card>
    </Container>
  );
}
