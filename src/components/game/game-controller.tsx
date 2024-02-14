import { clsx } from 'clsx';

import { Button, Divider, UndoStatus } from '@/components';
import { useSetScreen } from '@/context';
import { UseGameReturnType } from '@/hooks';
import { BasePlayer, PlayerConfigs, ScreenType } from '@/lib';

interface GameControllerProps
  extends Pick<UseGameReturnType, 'buttonStatus' | 'handlers' | 'undoCounts'> {
  className?: string;
  playerConfigs: PlayerConfigs;
  withBot: boolean;
  currentPlayer: BasePlayer;
}

export default function GameController({
  className,
  buttonStatus,
  handlers,
  playerConfigs,
  undoCounts,
  currentPlayer,
  withBot,
}: GameControllerProps) {
  const changeScreen = useSetScreen();
  const undoButtonText = withBot ? `undo (${undoCounts[BasePlayer.X]})` : 'undo';

  return (
    <div className={clsx('flex max-h-14 gap-3', className)}>
      <section className="flex gap-3">
        <Button onClick={() => changeScreen(ScreenType.Home)}>Home</Button>
        <Button disabled={!buttonStatus.reset} onClick={handlers.reset}>
          Reset
        </Button>
      </section>
      <Divider className="my-3" />
      <section className="flex gap-3">
        <Button disabled={!buttonStatus.undo} onClick={handlers.undo} className="capitalize">
          {undoButtonText}
        </Button>
        <UndoStatus
          playerConfigs={playerConfigs}
          undoCounts={undoCounts}
          className={clsx(withBot && 'hidden')}
          currentPlayer={currentPlayer}
        />
      </section>
    </div>
  );
}
