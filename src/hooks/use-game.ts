import { useCallback, useRef, useState } from 'react';

import { useUndoCount } from '@/hooks';
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

export const useGame = ({ size, winCondition, firstPlayer }: Omit<GameOption, 'playersInfo'>) => {
  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));
  const { undoCounts, decrementCount, resetCount } = useUndoCount();

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
    const indices = checkWin(newBoard, size, winCondition, row, col, player);

    if (indices) winner.current = { player, indices };
    else togglePlayer();
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

  const isPlaying = history.current.length > 0;
  const enableUndo = isPlaying && undoCounts[getCurrentPlayer(true)] > 0;

  return {
    board,
    getCurrentPlayer,
    handlers: { board: onBoardClick, undo, reset },
    winner: winner.current,
    undoCounts,
    enableUndo,
    enableReset: isPlaying,
  };
};
