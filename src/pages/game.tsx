import {
  Board,
  Box,
  DrawLabel,
  Fade,
  GameController,
  TurnIndicator,
  WinnerLabel,
} from '@/components';
import { useGameOption } from '@/context';
import { useGame } from '@/hooks';
import { BasePlayer } from '@/lib';

export default function Game() {
  const options = useGameOption();
  const { board, currentPlayer, handlers, controlStates, undoCounts, winner, isDraw } =
    useGame(options);

  return (
    <Fade className="m-auto flex size-full flex-col items-center justify-center gap-8">
      <GameController
        controlStates={controlStates}
        handlers={handlers}
        undoCounts={undoCounts}
        playerConfigs={options.playerConfigs}
        currentPlayer={currentPlayer}
        isSinglePlay={options.isSinglePlay}
      />
      <Board hideSequence board={board} handleClick={handlers.board} winner={winner} />
      <Box className="relative flex items-center gap-5 md:gap-8">
        <WinnerLabel target={BasePlayer.X} winner={winner.identifier} />
        <TurnIndicator currentPlayer={currentPlayer} playerConfigs={options.playerConfigs} />
        <WinnerLabel target={BasePlayer.O} winner={winner.identifier} />
        <DrawLabel isDraw={isDraw} />
      </Box>
    </Fade>
  );
}
