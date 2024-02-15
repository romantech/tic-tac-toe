import { clsx } from 'clsx';

import { Toggle } from '@/components';
import { ToggleProps } from '@/components/common/toggle';

interface OrderToggleProps extends ToggleProps {
  className?: string;
}

export default function OrderToggle({ className, ...inputProps }: OrderToggleProps) {
  return (
    <div className={clsx('ml-auto mt-auto flex flex-col gap-2 sm:flex-row', className)}>
      <span className="text-right capitalize text-slate-400">show order</span>
      <Toggle className="ml-auto" {...inputProps} />
    </div>
  );
}
