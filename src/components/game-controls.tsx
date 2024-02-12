import { clsx } from 'clsx';

import { Button, Divider, UndoStatus } from '@/components/index';
import { useSetScreen } from '@/context';
import { UseGameReturnType } from '@/hooks';
import { PlayerConfigs, ScreenType } from '@/lib';

interface GameControlsProps
  extends Pick<UseGameReturnType, 'buttonStatus' | 'handlers' | 'undoCounts'> {
  className?: string;
  playerConfigs: PlayerConfigs;
}

export default function GameControls({
  className,
  buttonStatus,
  handlers,
  playerConfigs,
  undoCounts,
}: GameControlsProps) {
  const changeScreen = useSetScreen();

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
        <Button disabled={!buttonStatus.undo} onClick={handlers.undo}>
          Undo
        </Button>
        <UndoStatus playerConfigs={playerConfigs} undoCounts={undoCounts} />
      </section>
    </div>
  );
}
