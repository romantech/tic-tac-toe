import { clsx } from 'clsx';

import { Button, Divider, UndoStatus } from '@/components';
import { useSetScreen } from '@/context';
import { UseGameReturnType } from '@/hooks';
import { BasePlayer, PlayerConfigs, ScreenType } from '@/lib';

interface GameControllerProps
  extends Pick<UseGameReturnType, 'controlStates' | 'handlers' | 'undoCounts'> {
  className?: string;
  playerConfigs: PlayerConfigs;
  isSinglePlay: boolean;
  currentPlayer: BasePlayer;
}

export default function GameController({
  className,
  controlStates,
  handlers,
  playerConfigs,
  undoCounts,
  currentPlayer,
  isSinglePlay,
}: GameControllerProps) {
  const changeScreen = useSetScreen();
  const undoButtonText = isSinglePlay ? `undo (${undoCounts[BasePlayer.X]})` : 'undo';

  return (
    <div className={clsx('flex max-h-14 gap-3', className)}>
      <section className="flex items-center gap-3">
        <Button onClick={() => changeScreen(ScreenType.Settings)}>Config</Button>
        <Button disabled={!controlStates.reset} onClick={handlers.reset}>
          Reset
        </Button>
      </section>
      <Divider className="my-3" />
      <section className="flex items-center gap-2">
        <Button disabled={!controlStates.undo} onClick={handlers.undo} className="capitalize">
          {undoButtonText}
        </Button>
        <UndoStatus
          playerConfigs={playerConfigs}
          enableUndo={controlStates.undo}
          undoCounts={undoCounts}
          className={clsx(isSinglePlay && 'hidden')}
          currentPlayer={currentPlayer}
        />
      </section>
    </div>
  );
}
