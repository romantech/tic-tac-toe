import { clsx } from 'clsx';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { BasePlayer } from '@/lib';

interface FirstPlayerCheckboxProps {
  name: string;
  player: BasePlayer;
  className?: string;
}

export default function FirstPlayerCheckbox({ name, player, className }: FirstPlayerCheckboxProps) {
  const { control } = useFormContext();
  const firstPlayer = useWatch({ control, name: 'firstPlayer' });

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <div>
            <input
              type="checkbox"
              className="hidden"
              id={`firstPlayer-${player}`}
              value={player}
              onChange={({ target }) => {
                if (firstPlayer !== player) onChange(target.value);
              }}
            />
            <label
              htmlFor={`firstPlayer-${player}`}
              className={clsx(
                'inline-block cursor-pointer rounded bg-amber-700 px-2 text-sm capitalize leading-7 text-slate-200 transition-all',
                { 'opacity-30 hover:opacity-60': firstPlayer !== player },
                { 'hover:opacity-90': firstPlayer === player },
              )}
            >
              first
            </label>
          </div>
        )}
      />
    </div>
  );
}
