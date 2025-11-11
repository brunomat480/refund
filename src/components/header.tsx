import { Link, useLocation } from 'react-router';

import Logo from '@/assets/images/refund-logo.svg?react';
import { Button } from '@/components/button';
import Container from '@/components/container';

export function Header() {
  const { pathname } = useLocation();

  return (
    <Container
      as="header"
      className="flex flex-wrap items-center justify-center gap-y-4 py-10 lg:justify-between"
    >
      <Link to="/">
        <Logo />
      </Link>

      <div className="flex gap-4">
        <Button
          data-pathname={pathname === '/'}
          asChild
          variant="link"
          className="data-[pathname=true]:text-green-100"
        >
          <Link to="/">Solicitações de reembolso</Link>
        </Button>
        <Button asChild>
          <Link to="/refund/new">Nova solicitação</Link>
        </Button>
      </div>
    </Container>
  );
}
