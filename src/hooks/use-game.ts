import { useCallback, useRef, useState } from 'react';

import { createHistory, useUndoCount } from '@/hooks';
import { useGameHistory } from '@/hooks/use-game-history';
import {
  checkWin,
  GameOption,
  getCoordinatesFromIdx,
  getInitialBoard,
  getPlayerMark,
  Player,
  TBoard,
  Winner,
} from '@/lib';

const defaultWinner: Winner = {
  player: null,
  indices: null,
};

export type UseGameReturnType = ReturnType<typeof useGame>;

export const useGame = ({ size, winCondition, firstPlayer, playerConfigs }: GameOption) => {
  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));
  const { undoCounts, decrementCount, resetCount } = useUndoCount();
  const { addHistory } = useGameHistory();

  const winner = useRef(defaultWinner);
  const history = useRef<Array<number>>([]);
  const xIsNext = useRef(firstPlayer === Player.X);

  const getCurrentPlayer = useCallback((opposition = false) => {
    return getPlayerMark(opposition ? !xIsNext.current : xIsNext.current);
  }, []);

  const togglePlayer = useCallback(() => {
    xIsNext.current = !xIsNext.current;
  }, []);

  const onBoardClick = (i: number) => {
    if (board[i] || winner.current.player) return;

    const player = getCurrentPlayer();
    const newBoard = [...board];
    newBoard[i] = player;
    setBoard(newBoard);

    history.current.push(i);
    const { row, col } = getCoordinatesFromIdx(i, size);
    const winIndices = checkWin(newBoard, size, winCondition, row, col, player);

    if (winIndices) winner.current = { player, indices: winIndices };
    else togglePlayer();

    if (winIndices || history.current.length === newBoard.length) {
      const history = createHistory(newBoard, winner.current, playerConfigs, size);
      addHistory(history);
    }
  };

  const undo = useCallback(() => {
    const lastIndex = history.current.at(-1);
    if (lastIndex === undefined || winner.current.player) return;

    history.current.pop();
    togglePlayer();
    decrementCount(getCurrentPlayer());

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastIndex] = null;
      return newBoard;
    });
  }, [decrementCount, getCurrentPlayer, togglePlayer]);

  const reset = useCallback(() => {
    setBoard(getInitialBoard(size));
    resetCount();
    winner.current = defaultWinner;
    history.current = [];
    xIsNext.current = firstPlayer === Player.X;
  }, [firstPlayer, resetCount, size]);

  const isStarted = history.current.length > 0;
  const isTied = isStarted && history.current.length === board.length;
  const hasWinner = Boolean(winner.current.player);
  const hasUndoCount = undoCounts[getCurrentPlayer(true)] > 0;
  const enableUndo = !hasWinner && !isTied && hasUndoCount;

  return {
    board,
    getCurrentPlayer,
    handlers: { board: onBoardClick, undo, reset },
    buttonStatus: { undo: enableUndo, reset: isStarted },
    winner: winner.current,
    undoCounts,
  };
};
