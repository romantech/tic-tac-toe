import { Board, Fade, GameController, TurnIndicator } from '@/components';
import { useGameOption } from '@/context';
import { useGame } from '@/hooks';
import { getBoardConfig } from '@/lib';

export default function Game() {
  const { firstPlayer, size, winCondition, playerConfigs, withBot } = useGameOption();
  const { board, currentPlayer, handlers, buttonStatus, undoCounts, winner } = useGame({
    size,
    winCondition,
    firstPlayer,
    playerConfigs,
    withBot,
  });

  return (
    <Fade className="flex h-screen flex-col items-center justify-center gap-4 py-20 text-slate-200 md:px-8">
      <GameController
        buttonStatus={buttonStatus}
        handlers={handlers}
        undoCounts={undoCounts}
        playerConfigs={playerConfigs}
        currentPlayer={currentPlayer}
        withBot={withBot}
      />
      <Board
        board={board}
        handleClick={handlers.board}
        className={getBoardConfig(size)}
        winner={winner}
      />
      <TurnIndicator currentPlayer={currentPlayer} playerConfigs={playerConfigs} />
    </Fade>
  );
}
