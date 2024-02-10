import { clsx } from 'clsx';

import { UndoCounts } from '@/hooks';
import { Player, PlayersInfo } from '@/lib';

interface UndoStatusProps {
  playersInfo: PlayersInfo;
  undoCounts: UndoCounts;
  className?: string;
}

export default function UndoStatus({ playersInfo, undoCounts, className }: UndoStatusProps) {
  return (
    <div className={clsx('text-slate-500', className)}>
      <Status mark={playersInfo[Player.X].mark} count={undoCounts[Player.X]} />
      <Status mark={playersInfo[Player.O].mark} count={undoCounts[Player.O]} />
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
