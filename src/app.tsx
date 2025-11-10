import Icon from '@/assets/icons/magnifying-glass.svg?react';
import { Button } from '@/components/button';

export function App() {
  return (
    <Button asChild variant="link">
      <Icon className="size-6" />
      <a href="/">Link</a>
    </Button>
  );
}
