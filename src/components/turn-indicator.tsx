import { clsx } from 'clsx';

import { Player } from '@/lib';

interface TurnProps {
  player: Player;
  className?: string;
}

export default function TurnIndicator({ player, className }: TurnProps) {
  return (
    <section
      className={clsx('relative flex select-none text-6xl font-bold text-slate-500', className)}
    >
      <div
        className={clsx(
          'absolute inset-x-0 size-20 rounded bg-green-200 transition-all duration-300 ease-in-out',
          player === Player.X ? 'translate-x-0' : 'translate-x-full', // 자신 너비만큼 수평 이동
        )}
      />
      {Object.values(Player).map((mark) => (
        <div
          key={mark}
          className={clsx('z-10 grid size-20 place-content-center rounded ', {
            'text-slate-800': player === mark,
          })}
        >
          {mark}
        </div>
      ))}
    </section>
  );
}
