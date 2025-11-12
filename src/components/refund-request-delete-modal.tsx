import type { ReactNode } from 'react';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/dialog';
import { Text } from '@/components/text';

interface RefundRequestDeleteModalProps {
  children: ReactNode;
}

export function RefundRequestDeleteModal({
  children,
}: RefundRequestDeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div>
          <Text
            as="h2"
            variant="heading"
            className="leading-none text-gray-100"
          >
            Excluir solicitação
          </Text>
          <Text as="p" variant="body" className="leadno mt-3">
            Tem certeza que deseja excluir essa solicitação? Essa ação é
            irreversível.
          </Text>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <DialogClose asChild>
            <Button variant="link">Cancelar</Button>
          </DialogClose>
          <Button>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
