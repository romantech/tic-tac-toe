import { Board, Button, TurnIndicator } from '@/components';
import { useGame } from '@/hooks';
import { boardConfigs, GameOption, Player } from '@/lib';

export default function Game({
  playersInfo,
  size = 3,
  winCondition = 3,
  firstPlayer = Player.X,
}: GameOption) {
  const { board, getCurrentPlayer, handlers, enableUndo, undoCounts } = useGame({
    size,
    winCondition,
    firstPlayer,
  });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <section className="flex gap-4">
        <Button disabled={!enableUndo} onClick={handlers.undo}>
          {`Undo (${undoCounts[getCurrentPlayer(true)]})`}
        </Button>
        <Button disabled>Home</Button>
      </section>
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
