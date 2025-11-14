import { type ReactNode, useState } from 'react';

import CircleNotchIcon from '@/assets/icons/circle-notch.svg?react';
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
  loading: boolean;
  onDeleteRefund: () => Promise<void>;
}

export function RefundRequestDeleteModal({
  children,
  loading,
  onDeleteRefund,
}: RefundRequestDeleteModalProps) {
  const [openModal, setOpenModal] = useState(false);

  async function handleOpenModal() {
    await onDeleteRefund();
    setOpenModal(false);
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
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
          <Button onClick={handleOpenModal}>
            {loading ? (
              <>
                <CircleNotchIcon className="size-5 animate-spin" /> Enviando...
              </>
            ) : (
              'Confirmar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
