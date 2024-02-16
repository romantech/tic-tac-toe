import { clsx } from 'clsx';

import { UndoCounts } from '@/hooks';
import { BasePlayer, PlayerConfigs } from '@/lib';

interface UndoStatusProps {
  playerConfigs: PlayerConfigs;
  currentPlayer: BasePlayer;
  undoCounts: UndoCounts;
  enableUndo?: boolean;
  className?: string;
}

export default function UndoStatus({
  playerConfigs,
  undoCounts,
  className,
  currentPlayer,
  enableUndo,
}: UndoStatusProps) {
  return (
    <div className={clsx('text-slate-500', className)}>
      {Object.values(BasePlayer).map((player) => {
        const highlight = player !== currentPlayer && enableUndo;
        return (
          <Status
            key={player}
            className={clsx({ 'text-slate-300': highlight })}
            mark={playerConfigs[player].mark}
            count={undoCounts[player]}
          />
        );
      })}
    </div>
  );
}

interface StatusProps {
  mark: string;
  count: number;
  className?: string;
}

const Status = ({ mark, count, className }: StatusProps) => {
  return (
    <div className={clsx('flex items-center justify-center gap-1', className)}>
      <p className="min-w-5 text-center">{mark}</p>
      <p className="w-[68px]">{`Count : ${count}`}</p>
    </div>
  );
};
