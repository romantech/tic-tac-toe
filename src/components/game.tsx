import { Board, Button, Divider, TurnIndicator, UndoStatus } from '@/components';
import { useGame } from '@/hooks';
import { boardConfigs, GameOption, Player } from '@/lib';

export default function Game({
  playersInfo,
  size = 3,
  winCondition = 3,
  firstPlayer = Player.X,
}: GameOption) {
  const { board, getCurrentPlayer, handlers, enableUndo, enableReset, undoCounts } = useGame({
    size,
    winCondition,
    firstPlayer,
  });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <div className="flex gap-4">
        <section className="flex gap-4">
          <Button disabled>Home</Button>
          <Button disabled={!enableReset} onClick={handlers.reset}>
            Reset
          </Button>
        </section>
        <Divider className="my-2" />
        <section className="flex gap-4">
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
        className={boardConfigs[size]}
      />
      <TurnIndicator currentPlayer={getCurrentPlayer()} playersInfo={playersInfo} />
    </div>
  );
}
