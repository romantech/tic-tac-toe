import { useCallback, useRef, useState } from 'react';

import { useUndoCount } from '@/hooks/useUndoCount';
import { BoardMark, checkWin, GameOption, getLastMove, getPlayerMark, Player, TBoard } from '@/lib';

const getInitialBoard = (size: number) => Array(size * size).fill(null);

export const useGame = ({ size, winCondition, firstPlayer }: Omit<GameOption, 'playersInfo'>) => {
  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));
  const { undoCounts, decrementCount, resetCount } = useUndoCount();

  const winner = useRef<BoardMark>(null);
  const history = useRef<Array<number>>([]);
  const xIsNext = useRef(firstPlayer === Player.X);

  const getCurrentPlayer = useCallback((opposition = false) => {
    return getPlayerMark(opposition ? !xIsNext.current : xIsNext.current);
  }, []);

  const togglePlayer = useCallback(() => {
    xIsNext.current = !xIsNext.current;
  }, []);

  const onBoardClick = (i: number) => {
    if (board[i] || winner.current) return;

    const currentPlayer = getCurrentPlayer();
    const newBoard = [...board];
    newBoard[i] = currentPlayer;
    setBoard(newBoard);

    togglePlayer();
    history.current.push(i);

    const { row, col } = getLastMove(i, size);
    const hasWin = checkWin(newBoard, size, winCondition, row, col, currentPlayer);
    if (hasWin) winner.current = currentPlayer;
  };

  const undo = () => {
    const lastIndex = history.current.at(-1);
    if (lastIndex === undefined || winner.current) return;

    history.current.pop();
    togglePlayer();
    decrementCount(getCurrentPlayer());

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastIndex] = null;
      return newBoard;
    });
  };

  const reset = useCallback(() => {
    setBoard(getInitialBoard(size));
    resetCount();
    winner.current = null;
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
