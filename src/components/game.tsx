import { Board, TurnIndicator } from '@/components';
import UndoButton from '@/components/undo-button';
import { useGame } from '@/hooks';
import { boardConfigs, GameOption, Player } from '@/lib';

export default function Game({ size = 3, winCondition = 3, firstPlayer = Player.X }: GameOption) {
  const { board, currentPlayer, onBoardClick, onUndoClick, winner, disableUndoButton, undoCounts } =
    useGame({ size, winCondition, firstPlayer });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <Board board={board} handleClick={onBoardClick} className={boardConfigs[size]} />
      <TurnIndicator currentPlayer={currentPlayer} />
      <UndoButton disabled={disableUndoButton} onClick={onUndoClick}>
        {`${currentPlayer} Undo counts: ${undoCounts[currentPlayer]}`}
      </UndoButton>
      <h1>{winner ? `Winner: ${winner}` : `Next Player: ${currentPlayer}`}</h1>
    </div>
  );
}
