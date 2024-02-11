import { clsx } from 'clsx';

import ColorPicker from '@/components/forms/color-picker';
import { MarkTextInput } from '@/components/forms/index';
import { Player } from '@/lib';

interface PlayerConfigProps {
  player: Player;
  className?: string;
}

const PlayerConfig = ({ player, className }: PlayerConfigProps) => {
  return (
    <fieldset
      className={clsx(
        className,
        'flex w-full items-center overflow-hidden rounded-lg border border-slate-600',
      )}
    >
      <h3 className="whitespace-nowrap bg-slate-700 px-3 font-medium leading-[46px]">
        {`Player ${player}`}
      </h3>
      <div className="flex w-full items-center gap-3 px-3">
        <MarkTextInput name={`playerConfigs.${player}.mark`} />
        <ColorPicker name={`playerConfigs.${player}.color`} />
      </div>
    </fieldset>
  );
};

interface PlayerConfigsFieldProps {
  className?: string;
}

export default function PlayerConfigsField({ className }: PlayerConfigsFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <h3 className="pb-1 text-2xl font-semibold uppercase">player setting</h3>
      <PlayerConfig player={Player.X} />
      <PlayerConfig player={Player.O} />
    </div>
  );
}
