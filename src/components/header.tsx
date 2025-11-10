import { Link } from 'react-router';

import Logo from '@/assets/images/refund-logo.svg?react';
import { Button } from '@/components/button';
import Container from '@/components/container';

export function Header() {
  return (
    <Container
      as="header"
      className="flex flex-wrap items-center justify-center gap-y-4 py-10 lg:justify-between lg:px-22.5"
    >
      <Link to="/">
        <Logo />
      </Link>

      <div className="flex gap-4">
        <Button asChild variant="link">
          <Link to="/refund/new">Solicitações de reembolso</Link>
        </Button>
        <Button>Nova solicitação</Button>
      </div>
    </Container>
  );
}
