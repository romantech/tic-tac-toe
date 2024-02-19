import { clsx } from 'clsx';
import { useWatch } from 'react-hook-form';

import { Box, ColorPicker, FirstPlayerRadio, MarkTextInput, Title } from '@/components';
import { BasePlayer, getPlayerLabel } from '@/lib';

interface PlayerConfigsFieldProps {
  className?: string;
}

export default function PlayerConfigsField({ className }: PlayerConfigsFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Title>player setting</Title>
      <PlayerConfig player={BasePlayer.X} />
      <PlayerConfig player={BasePlayer.O} />
    </div>
  );
}

interface PlayerConfigProps {
  player: BasePlayer;
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
      <PlayerLabel player={player} />
      <div className="flex w-full items-center gap-2 px-2 text-sm">
        <MarkTextInput name={`playerConfigs.${player}.mark`} />
        <ColorPicker name={`playerConfigs.${player}.color`} />
        <FirstPlayerRadio name="firstPlayer" player={player} />
      </div>
    </fieldset>
  );
};

interface PlayerLabelProps {
  player: BasePlayer;
  className?: string;
}

const PlayerLabel = ({ player, className }: PlayerLabelProps) => {
  const gameMode = useWatch({ name: 'gameMode' });

  return (
    <Box
      as="h3"
      className={clsx(
        'min-w-[84px] whitespace-nowrap bg-gradient-to-r from-slate-700 to-slate-800 text-center font-medium leading-[46px]',
        className,
      )}
    >
      {getPlayerLabel(gameMode, player)}
    </Box>
  );
};
