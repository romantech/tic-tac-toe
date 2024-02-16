import { clsx } from 'clsx';

import { BasePlayer } from '@/lib';

interface WinnerLabelProps {
  target: BasePlayer;
  className?: string;
  winner: BasePlayer | null;
}

export default function WinnerLabel({ target, winner, className }: WinnerLabelProps) {
  return (
    <span
      className={clsx(
        'text-3xl font-bold uppercase italic transition-all duration-300 md:text-4xl',
        { 'invisible opacity-0': target !== winner, 'animate-win': target === winner },
        className,
      )}
    >
      win
    </span>
  );
}
