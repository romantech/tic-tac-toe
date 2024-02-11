import { clsx } from 'clsx';

interface DividerProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export default function Divider({ className, direction = 'vertical' }: DividerProps) {
  return (
    <div
      className={clsx(
        'inline-block self-stretch bg-slate-600 opacity-70',
        {
          'h-px min-w-full': direction === 'horizontal',
          'min-h-1 w-px': direction === 'vertical',
        },
        className,
      )}
    ></div>
  );
}
