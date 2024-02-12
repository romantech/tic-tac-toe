import { clsx } from 'clsx';

import { UndoCounts } from '@/hooks';
import { BasePlayer, PlayerConfigs } from '@/lib';

interface UndoStatusProps {
  playerConfigs: PlayerConfigs;
  undoCounts: UndoCounts;
  className?: string;
}

export default function UndoStatus({ playerConfigs, undoCounts, className }: UndoStatusProps) {
  return (
    <div className={clsx('text-slate-500', className)}>
      <Status mark={playerConfigs[BasePlayer.X].mark} count={undoCounts[BasePlayer.X]} />
      <Status mark={playerConfigs[BasePlayer.O].mark} count={undoCounts[BasePlayer.O]} />
    </div>
  );
}

interface StatusProps {
  mark: string;
  count: number;
}

const Status = ({ mark, count }: StatusProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <p className="min-w-5 text-center text-xl">{mark}</p>
      <p className="w-[68px]">{`Count : ${count}`}</p>
    </div>
  );
};
