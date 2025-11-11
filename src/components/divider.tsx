import { cva, type VariantProps } from 'class-variance-authority';

export const dividerVariants = cva('w-full h-px', {
  variants: {
    variant: {
      default: 'bg-gray-400',
    },
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'w-px h-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface DividerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical';
}

export default function Divider({
  className,
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  return (
    <div className={dividerVariants({ className, orientation })} {...props} />
  );
}
