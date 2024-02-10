import { clsx } from 'clsx';

import { Player } from '@/lib';

interface TurnProps {
  currentPlayer: Player;
  className?: string;
}

export default function TurnIndicator({ currentPlayer, className }: TurnProps) {
  return (
    <section
      className={clsx('relative flex select-none text-6xl font-bold text-slate-500', className)}
    >
      <div
        className={clsx(
          'absolute inset-x-0 size-20 rounded bg-green-200 transition-all duration-300 ease-in-out',
          currentPlayer === Player.X ? 'translate-x-0' : 'translate-x-full', // 자신 너비만큼 수평 이동
        )}
      />
      {Object.values(Player).map((player) => (
        <div
          key={player}
          className={clsx('z-10 grid size-20 place-content-center rounded ', {
            'text-slate-800': currentPlayer === player,
          })}
        >
          {player}
        </div>
      ))}
    </section>
  );
}
