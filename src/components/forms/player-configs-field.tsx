import { clsx } from 'clsx';
import { useWatch } from 'react-hook-form';

import { Box, ColorPicker, FirstPlayerCheckbox, MarkTextInput, Title } from '@/components';
import { BasePlayer, GameMode, getPlayerLabel } from '@/lib';

interface PlayerLabelProps {
  player: BasePlayer;
  gameMode: GameMode;
  className?: string;
}

const PlayerLabel = ({ player, className, gameMode }: PlayerLabelProps) => {
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

interface PlayerConfigProps {
  player: BasePlayer;
  gameMode: GameMode;
  className?: string;
}

const PlayerConfig = ({ player, className, gameMode }: PlayerConfigProps) => {
  return (
    <fieldset
      className={clsx(
        className,
        'flex w-full items-center overflow-hidden rounded-lg border border-slate-600',
      )}
    >
      <PlayerLabel player={player} gameMode={gameMode} />
      <div className="flex w-full items-center gap-2 px-2 text-sm">
        <MarkTextInput name={`playerConfigs.${player}.mark`} />
        <ColorPicker name={`playerConfigs.${player}.color`} />
        <FirstPlayerCheckbox name={'firstPlayer'} player={player} />
      </div>
    </fieldset>
  );
};

interface PlayerConfigsFieldProps {
  className?: string;
}

export default function PlayerConfigsField({ className }: PlayerConfigsFieldProps) {
  const gameMode = useWatch({ name: 'gameMode' });

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Title>player setting</Title>
      <PlayerConfig player={BasePlayer.X} gameMode={gameMode} />
      <PlayerConfig player={BasePlayer.O} gameMode={gameMode} />
    </div>
  );
}
