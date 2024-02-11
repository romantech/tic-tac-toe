import { Board, Button, Divider, TurnIndicator, UndoStatus } from '@/components';
import { useGame } from '@/hooks';
import { boardConfig, GameOption, Player, ScreenType } from '@/lib';

interface GameProps extends GameOption {
  onClick?: (type: ScreenType) => void;
}

export default function Game({
  onClick,
  playersInfo,
  size = 3,
  winCondition = 3,
  firstPlayer = Player.X,
}: GameProps) {
  const { board, getCurrentPlayer, handlers, enableUndo, enableReset, undoCounts, winner } =
    useGame({
      size,
      winCondition,
      firstPlayer,
    });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <div className="flex max-h-14 gap-3">
        <section className="flex gap-3">
          <Button onClick={() => onClick?.(ScreenType.Home)}>Home</Button>
          <Button disabled={!enableReset} onClick={handlers.reset}>
            Reset
          </Button>
        </section>
        <Divider className="my-3" />
        <section className="flex gap-3">
          <Button disabled={!enableUndo} onClick={handlers.undo}>
            Undo
          </Button>
          <UndoStatus playersInfo={playersInfo} undoCounts={undoCounts} />
        </section>
      </div>
      <Board
        playersInfo={playersInfo}
        board={board}
        handleClick={handlers.board}
        className={boardConfig[size]}
        winner={winner}
      />
      <TurnIndicator currentPlayer={getCurrentPlayer()} playersInfo={playersInfo} />
    </div>
  );
}
