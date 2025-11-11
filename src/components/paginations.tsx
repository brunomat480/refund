import type { ComponentProps } from 'react';

import CaretIcon from '@/assets/icons/caret.svg?react';
import { Button } from '@/components/button';
import { Text } from '@/components/text';

interface PaginationProps extends ComponentProps<'div'> {}

export function Pagination({ ...props }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1.5" {...props}>
      <Button size="sm">
        <CaretIcon className="size-6 rotate-180" />
      </Button>
      <Text variant="body">1/3</Text>
      <Button size="sm">
        <CaretIcon className="size-6" />
      </Button>
    </div>
  );
}
