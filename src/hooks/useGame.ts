import { useCallback, useRef, useState } from 'react';

import { useUndoCount } from '@/hooks/useUndoCount';
import { BoardMark, checkWin, GameOption, getLastMove, getPlayer, Player, TBoard } from '@/lib';

export const useGame = ({ size, winCondition, firstPlayer }: GameOption) => {
  const [board, setBoard] = useState<TBoard>(Array(size * size).fill(null));
  const { undoCounts, decrementCount } = useUndoCount();

  const winner = useRef<BoardMark>(null);
  const history = useRef<Array<number>>([]);
  const xIsNext = useRef(firstPlayer === Player.X);

  const currentPlayer = getPlayer(xIsNext.current);
  const disableUndoButton = history.current.length === 0;

  const onBoardClick = (i: number) => {
    if (board[i] || winner.current) return;

    const newBoard = [...board];
    newBoard[i] = currentPlayer;
    setBoard(newBoard);

    xIsNext.current = !xIsNext.current;
    history.current.push(i);

    const { row, col } = getLastMove(i, size);
    const hasWin = checkWin(newBoard, size, winCondition, row, col, currentPlayer);
    if (hasWin) winner.current = currentPlayer;
  };

  const onUndoClick = useCallback(() => {
    const lastIndex = history.current.at(-1);
    if (!lastIndex || winner.current) return;

    history.current.pop();
    xIsNext.current = !xIsNext.current;
    decrementCount(getPlayer(xIsNext.current));

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastIndex] = null;
      return newBoard;
    });
  }, [decrementCount]);

  return {
    board,
    currentPlayer,
    onBoardClick,
    onUndoClick,
    winner: winner.current,
    undoCounts,
    disableUndoButton,
  };
};
