import { Button } from '@/components/button';

export function App() {
  return (
    <Button asChild disabled>
      <a href="/">Link</a>
    </Button>
  );
}
