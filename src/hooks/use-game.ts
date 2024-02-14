import { useCallback, useEffect, useRef, useState } from 'react';

import { useGameHistory, useUndoCount } from '@/hooks';
import {
  BasePlayer,
  BoardIdx,
  checkWin,
  createHistory,
  createSquare,
  defaultSquare,
  defaultWinner,
  findBestMove,
  GameOption,
  getInitialBoard,
  getOpponent,
  isNumber,
  TBoard,
} from '@/lib';

export type UseGameReturnType = ReturnType<typeof useGame>;

interface UseGameProps extends Omit<GameOption, 'gameMode'> {
  isSinglePlay: boolean;
}

export const useGame = ({
  size,
  winCondition,
  firstPlayer,
  playerConfigs,
  isSinglePlay,
}: UseGameProps) => {
  const currentPlayer = useRef<BasePlayer>(firstPlayer);
  const winner = useRef(defaultWinner);
  const sequence = useRef<Array<BoardIdx>>([]);

  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));
  const { undoCounts, decrementCount, resetCount, getUndoCountBy } = useUndoCount(isSinglePlay);
  const { addHistory } = useGameHistory();

  const togglePlayer = useCallback(() => {
    currentPlayer.current = getOpponent(currentPlayer.current);
  }, []);

  const onBoardClick = useCallback(
    (boardIdx: BoardIdx) => {
      if (board[boardIdx].identifier || winner.current.identifier) return;

      sequence.current.push(boardIdx);

      const identifier = currentPlayer.current;
      const updatedSequence = sequence.current;
      const { color, mark } = playerConfigs[identifier];

      const newBoard = [...board];
      newBoard[boardIdx] = createSquare(identifier, mark, updatedSequence.length, color);
      setBoard(newBoard);

      const winIndices = checkWin(newBoard, size, winCondition, boardIdx, identifier);
      if (winIndices) winner.current = { identifier, indices: winIndices, mark };

      const shouldAddHistory = winIndices || updatedSequence.length === newBoard.length;
      if (shouldAddHistory) addHistory(createHistory(newBoard, winner.current, size));
      else togglePlayer();
    },
    [addHistory, board, playerConfigs, size, togglePlayer, winCondition],
  );

  const undo = () => {
    const lastBoardIdx = sequence.current.at(-1);
    const secondLastBoardIdx = sequence.current.at(-2);
    if (!isNumber(lastBoardIdx) || winner.current.identifier) return;

    sequence.current.splice(isSinglePlay ? -2 : -1);
    decrementCount(currentPlayer.current);
    if (!isSinglePlay) togglePlayer();

    setBoard((prev) => {
      const newBoard = [...prev];
      const shouldSetSecondLast = isSinglePlay && isNumber(secondLastBoardIdx);
      if (shouldSetSecondLast) newBoard[secondLastBoardIdx] = defaultSquare;
      newBoard[lastBoardIdx] = defaultSquare;
      return newBoard;
    });
  };

  const reset = () => {
    setBoard(getInitialBoard(size));
    currentPlayer.current = firstPlayer;
    winner.current = defaultWinner;
    sequence.current = [];
    resetCount();
  };

  useEffect(() => {
    if (currentPlayer.current === BasePlayer.O && isSinglePlay) {
      const nextIndex = findBestMove(board, size, winCondition, currentPlayer.current);
      if (isNumber(nextIndex)) setTimeout(() => onBoardClick(nextIndex), 350);
    }
  }, [board, isSinglePlay, onBoardClick, size, winCondition]);

  const isStarted = sequence.current.length > 0;
  const isTied = isStarted && sequence.current.length === board.length;

  const hasWinner = Boolean(winner.current.identifier);
  const hasUndoCount = getUndoCountBy(currentPlayer.current) > 0;

  const enableUndo = !hasWinner && !isTied && hasUndoCount;
  const enableBoard = !isSinglePlay ? true : currentPlayer.current === BasePlayer.X;

  return {
    board,
    currentPlayer: currentPlayer.current,
    handlers: { board: onBoardClick, undo, reset },
    controlStates: { undo: enableUndo, reset: isStarted, board: enableBoard },
    winner: winner.current,
    undoCounts,
  };
};
