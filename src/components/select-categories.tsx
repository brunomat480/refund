import { inputWrapperVariants } from '@/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { Text } from '@/components/text';

const options = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'hospedagem', label: 'Hospedagem' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'outros', label: 'Outros' },
];

export function SelectCategories() {
  return (
    <div className={inputWrapperVariants()}>
      <Text
        as="label"
        variant="label"
        htmlFor="category"
        className="group-focus-within:text-green-100"
      >
        CATEGORIA
      </Text>
      <Select>
        <SelectTrigger id="category">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
