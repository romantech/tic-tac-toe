import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

import { Title } from '@/components';
import { GameMode } from '@/lib';

export default function GameModeRadio() {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <Title>game mode</Title>
      <div className="flex gap-4">
        {Object.values(GameMode).map((mode) => (
          <label
            key={mode}
            className={clsx(
              'grid w-full cursor-pointer place-content-center gap-2 rounded-md border border-slate-500 p-2 shadow-md transition-all duration-300',
              'has-[:checked]:bg-slate-600/70 has-[:checked]:font-medium has-[:checked]:text-slate-200 has-[:checked]:hover:bg-slate-600/85',
              'text-slate-500 hover:bg-slate-700/50', // gameMode !== mode
            )}
          >
            <input {...register('gameMode')} value={mode} type="radio" className="sr-only" />
            <span className="capitalize">
              {mode === GameMode.SinglePlayer ? 'single player' : 'two players'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
