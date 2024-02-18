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
              'grid w-full cursor-pointer place-content-center gap-2 rounded-md border border-slate-500 p-2 shadow transition-all duration-300',
              {
                'text-slate-500': gameMode !== mode,
                'font-medium bg-slate-600/70': gameMode === mode,
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
