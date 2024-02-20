import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

import { BasePlayer } from '@/lib';

interface FirstPlayerRadioProps {
  name: string;
  player: BasePlayer;
  className?: string;
}

export default function FirstPlayerRadio({ name, player, className }: FirstPlayerRadioProps) {
  const { register } = useFormContext();

  return (
    <div className={className}>
      <input
        {...register(name)}
        type="radio"
        className="peer sr-only"
        id={`firstPlayer-${player}`}
        value={player}
      />
      <label
        htmlFor={`firstPlayer-${player}`}
        className={clsx(
          'inline-block w-14 cursor-pointer rounded-md border border-slate-500 text-center capitalize leading-7 shadow-md transition-all duration-300',
          'peer-checked:bg-slate-600/70 peer-checked:font-medium peer-checked:text-slate-200 peer-checked:hover:bg-slate-600/85',
          'text-slate-500 hover:bg-slate-700/50',
        )}
      >
        first
      </label>
    </div>
  );
}
