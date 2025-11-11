import MagnifyingGlassIcon from '@/assets/icons/magnifying-glass.svg?react';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import Container from '@/components/container';
import Container from '@/components/container';
import { Text } from '@/components/text';

export function HomePage() {
  return (
    <Container>
      <Card className="mx-auto max-w-270.5">
        <Text as="h1" variant="heading" className="text-gray-100">
          Solicitações
        </Text>

        <div className="mt-6 flex items-center gap-3">
          <input
            className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none hover:transition hover:duration-200 focus:border-[1.5px] focus:border-green-100"
            placeholder="Pesquisar pelo nome"
          />

          <Button size="icon">
            <MagnifyingGlassIcon className="size-6" />
          </Button>
        </div>
      </Card>
    </Container>
  );
}
