import { clsx } from 'clsx';

import ColorPicker from '@/components/forms/color-picker';
import { MarkTextInput } from '@/components/forms/index';
import { Player } from '@/lib';

interface PlayerInfoFieldProps {
  player: Player;
  className?: string;
}

const PlayerInfo = ({ player, className }: PlayerInfoFieldProps) => {
  return (
    <div
      className={clsx(
        className,
        'flex w-full items-center overflow-hidden rounded-lg border border-slate-600',
      )}
    >
      <div className="whitespace-nowrap bg-slate-700 px-3 font-medium leading-[46px]">{`Player ${player}`}</div>
      <div className="flex w-full items-center gap-3 px-3">
        <MarkTextInput name={`playersInfo.${player}.mark`} />
        <ColorPicker name={`playersInfo.${player}.color`} />
      </div>
    </div>
  );
};

interface PlayersInfoFormProps {
  className?: string;
}

export default function PlayersInfoField({ className }: PlayersInfoFormProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <h3 className="pb-1 text-2xl font-semibold uppercase">players info</h3>
      <PlayerInfo player={Player.X} />
      <PlayerInfo player={Player.O} />
    </div>
  );
}
