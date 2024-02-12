import { Board, GameController, TurnIndicator } from '@/components';
import { useGameOption } from '@/context';
import { useGame } from '@/hooks';
import { getBoardConfig } from '@/lib';

export default function Game() {
  const { firstPlayer, size, winCondition, playerConfigs } = useGameOption();
  const { board, getCurrentPlayer, handlers, buttonStatus, undoCounts, winner } = useGame({
    size,
    winCondition,
    firstPlayer,
    playerConfigs,
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 py-20 text-slate-200 md:px-8">
      <GameController
        buttonStatus={buttonStatus}
        handlers={handlers}
        undoCounts={undoCounts}
        playerConfigs={playerConfigs}
      />
      <Board
        board={board}
        handleClick={handlers.board}
        className={getBoardConfig(size)}
        winner={winner}
      />
      <TurnIndicator currentPlayer={getCurrentPlayer()} playerConfigs={playerConfigs} />
    </div>
  );
}
