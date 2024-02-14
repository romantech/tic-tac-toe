import { clsx } from 'clsx';

import { UndoCounts } from '@/hooks';
import { BasePlayer, PlayerConfigs } from '@/lib';

interface UndoStatusProps {
  playerConfigs: PlayerConfigs;
  currentPlayer: BasePlayer;
  undoCounts: UndoCounts;
  className?: string;
}

export default function UndoStatus({
  playerConfigs,
  undoCounts,
  className,
  currentPlayer,
}: UndoStatusProps) {
  return (
    <div className={clsx('text-slate-500', className)}>
      {Object.values(BasePlayer).map((player) => (
        <Status
          key={player}
          className={clsx({ 'text-slate-200': player === currentPlayer })}
          mark={playerConfigs[player].mark}
          count={undoCounts[player]}
        />
      ))}
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
    <div className={clsx('flex items-center justify-center gap-2', className)}>
      <p className="min-w-5 text-center text-xl">{mark}</p>
      <p className="w-[68px]">{`Count : ${count}`}</p>
    </div>
  );
};
