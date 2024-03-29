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
      className={clsx(
        'flex items-center gap-3 rounded-md px-3 shadow-md',
        { 'bg-slate-600/30 text-slate-500': disabled, 'bg-slate-600/80': !disabled },
        className,
      )}
    >
      <span className="font-medium capitalize">show order</span>
      <Toggle className="ml-auto" disabled={disabled} {...inputProps} />
    </Box>
  );
}
