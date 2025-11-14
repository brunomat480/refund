import { Link } from 'react-router';

import CheckCircleImage from '@/assets/images/check-circle.svg?react';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { Text } from '@/components/text';

export function SendingRefundRequestPage() {
  return (
    <Container>
      <Card className="mx-auto max-w-lg text-center">
        <div className="space-y-6">
          <Text as="h1" variant="heading" className="text-2xl text-green-100">
            Solicitação enviada!
          </Text>

          <CheckCircleImage className="mx-auto" />

          <Text as="p" variant="body">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </Text>
        </div>
        <Button asChild type="button" className="mt-10 w-full">
          <Link to="/refund/new">Nova solicitação</Link>
        </Button>
      </Card>
    </Container>
  );
}
