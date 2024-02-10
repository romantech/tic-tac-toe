import { Board, TurnIndicator } from '@/components';
import UndoButton from '@/components/undo-button';
import { useGame } from '@/hooks';
import { boardConfigs, GameOption, Player } from '@/lib';

export default function Game({ size = 3, winCondition = 3, firstPlayer = Player.X }: GameOption) {
  const { board, player, handlers, winner, enableUndo, undoCounts } = useGame({
    size,
    winCondition,
    firstPlayer,
  });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <Board board={board} handleClick={handlers.board} className={boardConfigs[size]} />
      <TurnIndicator player={player} />
      <UndoButton disabled={!enableUndo} onClick={handlers.undo}>
        Undo
      </UndoButton>
      <h1>{winner ? `Winner: ${winner}` : `Next Player: ${player}`}</h1>
      <div>{`X Undo Count: ${undoCounts[Player.X]}, O Undo Count: ${undoCounts[Player.O]}`}</div>
    </div>
  );
}
