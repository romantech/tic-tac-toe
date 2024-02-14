import { clsx } from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';

import { Title } from '@/components';
import { GameMode } from '@/lib';

export default function GameModeRadio() {
  const { register } = useFormContext();
  const gameMode = useWatch({ name: 'gameMode' });

  return (
    <div className="flex flex-col gap-2">
      <Title>game mode</Title>
      <div className="flex gap-4">
        {Object.values(GameMode).map((mode) => (
          <label
            key={mode}
            className={clsx(
              'grid w-full cursor-pointer place-content-center gap-2 rounded bg-secondary bg-gradient-to-r from-amber-900 to-amber-600 p-2 font-semibold text-slate-200  transition-all duration-300',
              {
                'opacity-30 hover:opacity-60': gameMode !== mode,
                'hover:opacity-90': gameMode === mode,
              },
            )}
          >
            <input
              {...register('gameMode')}
              value={mode}
              type="radio"
              className="hidden appearance-none"
            />
            <span className="capitalize">
              {mode === GameMode.SinglePlayer ? 'single player' : 'two players'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
