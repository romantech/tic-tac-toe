import { Board, GameControls, TurnIndicator } from '@/components';
import { useGameOption } from '@/context';
import { useGame } from '@/hooks';
import { boardConfig } from '@/lib';

export default function Game() {
  const { firstPlayer, size, winCondition, playerConfigs } = useGameOption();
  const { board, getCurrentPlayer, handlers, buttonStatus, undoCounts, winner } = useGame({
    size,
    winCondition,
    firstPlayer,
  });

  return (
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <GameControls
        buttonStatus={buttonStatus}
        handlers={handlers}
        undoCounts={undoCounts}
        playerConfigs={playerConfigs}
      />
      <Board
        playerConfigs={playerConfigs}
        board={board}
        handleClick={handlers.board}
        className={boardConfig[size]}
        winner={winner}
      />
      <TurnIndicator currentPlayer={getCurrentPlayer()} playerConfigs={playerConfigs} />
    </div>
  );
}
