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
                'inline-block w-14 cursor-pointer rounded-md border border-slate-500 text-center capitalize leading-7 shadow transition-all duration-300',
                { 'text-slate-500': firstPlayer !== player },
                { 'font-medium bg-slate-600/70': firstPlayer === player },
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
