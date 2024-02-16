import { Board, Fade, GameController, TurnIndicator } from '@/components';
import { useGameOption } from '@/context';
import { useGame } from '@/hooks';
import { BoardType, getBoardConfig } from '@/lib';

export default function Game() {
  const options = useGameOption();
  const { board, currentPlayer, handlers, controlStates, undoCounts, winner } = useGame(options);

  return (
    <Fade className="m-auto flex size-full flex-col items-center justify-center gap-8 text-slate-200 md:px-8">
      <GameController
        controlStates={controlStates}
        handlers={handlers}
        undoCounts={undoCounts}
        playerConfigs={options.playerConfigs}
        currentPlayer={currentPlayer}
        isSinglePlay={options.isSinglePlay}
      />
      <Board
        hideSequence
        board={board}
        handleClick={handlers.board}
        className={getBoardConfig(options.size, BoardType.Play)}
        winner={winner}
      />
      <TurnIndicator currentPlayer={currentPlayer} playerConfigs={options.playerConfigs} />
    </Fade>
  );
}
