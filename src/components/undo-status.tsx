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
      <Status mark={playersInfo[Player.X].customMark} count={undoCounts[Player.X]} />
      <Status mark={playersInfo[Player.O].customMark} count={undoCounts[Player.O]} />
    </div>
  );
}

interface StatusProps {
  mark: string;
  count: number;
}

const Status = ({ mark, count }: StatusProps) => {
  return (
    <h3 className="flex items-center justify-center gap-2">
      <span className="inline-block min-w-4 text-xl">{mark}</span>
      <span>{`Count : ${count}`}</span>
    </h3>
  );
};
