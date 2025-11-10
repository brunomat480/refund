import Icon from '@/assets/icons/magnifying-glass.svg?react';
import { Button } from '@/components/button';
import Container from '@/components/container';

export function App() {
  return (
    <Container>
      <Button asChild variant="default" className="max-w-md">
        <Icon className="size-6" />
        <a href="/">Link</a>
      </Button>
    </Container>
  );
}
