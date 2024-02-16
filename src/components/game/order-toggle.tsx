import { clsx } from 'clsx';

import { Toggle } from '@/components';
import { ToggleProps } from '@/components/common/toggle';

interface OrderToggleProps extends ToggleProps {
  className?: string;
}

export default function OrderToggle({ className, ...inputProps }: OrderToggleProps) {
  return (
    <div
      className={clsx('rounded-lg bg-gradient-to-r from-slate-300 to-slate-700 p-0.5', className)}
    >
      <div className="flex size-full items-center gap-3 rounded-md bg-slate-800 px-3">
        <span className="text-right font-semibold capitalize">show order</span>
        <Toggle className="ml-auto" {...inputProps} />
      </div>
    </div>
  );
}
