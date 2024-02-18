import { clsx } from 'clsx';

import { Box, Toggle } from '@/components';
import { ToggleProps } from '@/components/common/toggle';

interface OrderToggleProps extends ToggleProps {
  className?: string;
  disabled?: boolean;
}

export default function OrderToggle({ className, disabled, ...inputProps }: OrderToggleProps) {
  return (
    <Box
      className={clsx('flex items-center gap-3 rounded-md bg-slate-700 px-3 shadow-md', className, {
        'bg-slate-600/30 text-slate-500': disabled,
      })}
    >
      <span className="font-medium capitalize">show order</span>
      <Toggle className="ml-auto" disabled={disabled} {...inputProps} />
    </Box>
  );
}
