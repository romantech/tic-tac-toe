import { clsx } from 'clsx';

import { BasePlayer, PlayerConfigs } from '@/lib';

interface TurnProps {
  currentPlayer: BasePlayer;
  playerConfigs: PlayerConfigs;
  className?: string;
}

export default function TurnIndicator({ currentPlayer, className, playerConfigs }: TurnProps) {
  return (
    <section
      className={clsx(
        'relative flex select-none text-6xl font-extrabold text-slate-500',
        className,
      )}
    >
      <div
        className={clsx(
          'absolute inset-x-0 size-20 rounded-lg transition-all duration-300 ease-in-out',
          currentPlayer === BasePlayer.X ? 'translate-x-0' : 'translate-x-full', // 자신 너비만큼 수평 이동
        )}
        style={{ backgroundColor: playerConfigs[currentPlayer].color }}
      />
      {Object.values(BasePlayer).map((player) => (
        <div
          key={player}
          className={clsx('z-10 grid size-20 place-content-center rounded ', {
            'text-slate-800': player === currentPlayer,
          })}
        >
          {playerConfigs[player].mark}
        </div>
      ))}
    </section>
  );
}
