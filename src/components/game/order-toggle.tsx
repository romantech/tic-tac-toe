import { clsx } from 'clsx';

import { Box, Toggle } from '@/components';
import { ToggleProps } from '@/components/common/toggle';

interface OrderToggleProps extends ToggleProps {
  className?: string;
}

export default function OrderToggle({ className, ...inputProps }: OrderToggleProps) {
  return (
    <Box
      className={clsx('flex items-center gap-3 rounded-md bg-slate-700 px-3 shadow-md', className)}
    >
      <span className="font-medium capitalize">show order</span>
      <Toggle className="ml-auto" {...inputProps} />
    </Box>
  );
}
