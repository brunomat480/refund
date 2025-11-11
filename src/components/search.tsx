import MagnifyingGlassIcon from '@/assets/icons/magnifying-glass.svg?react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

export function Search() {
  return (
    <form className="flex items-center gap-3">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Buscar solitição
        </label>
        <Input id="search" placeholder="Pesquisar pelo nome" />
      </div>

      <Button size="icon" type="submit">
        <MagnifyingGlassIcon className="size-6" />
      </Button>
    </form>
  );
}
