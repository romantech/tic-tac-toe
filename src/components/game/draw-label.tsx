import { clsx } from 'clsx';

import { Box } from '@/components';

interface DrawLabelProps {
  isDraw: boolean;
  className?: string;
}

export default function DrawLabel({ isDraw, className }: DrawLabelProps) {
  return (
    <Box
      className={clsx(
        'absolute left-1/2 z-10 -translate-x-1/2 bg-slate-800 px-10 py-6 text-3xl font-bold uppercase italic text-slate-200 transition-all duration-500',
        {
          'invisible opacity-0 scale-0 translate-y-full': !isDraw,
          'visible opacity-100 scale-100': isDraw,
        },
        className,
      )}
    >
      draw
    </Box>
  );
}
