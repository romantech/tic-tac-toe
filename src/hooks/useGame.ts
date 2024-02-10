import { useCallback, useRef, useState } from 'react';

import { useUndoCount } from '@/hooks/useUndoCount';
import { BoardMark, checkWin, GameOption, getLastMove, getPlayerMark, Player, TBoard } from '@/lib';

export const useGame = ({ size, winCondition, firstPlayer }: GameOption) => {
  const [board, setBoard] = useState<TBoard>(Array(size * size).fill(null));
  const { undoCounts, decrementCount } = useUndoCount();

  const winner = useRef<BoardMark>(null);
  const history = useRef<Array<number>>([]);
  const xIsNext = useRef(firstPlayer === Player.X);

  const getPlayer = useCallback((opposition = false) => {
    return getPlayerMark(opposition ? !xIsNext.current : xIsNext.current);
  }, []);

  const togglePlayer = useCallback(() => {
    xIsNext.current = !xIsNext.current;
  }, []);

  const onBoardClick = (i: number) => {
    if (board[i] || winner.current) return;

    const newBoard = [...board];
    newBoard[i] = getPlayer();
    setBoard(newBoard);

    togglePlayer();
    history.current.push(i);

    const { row, col } = getLastMove(i, size);
    const hasWin = checkWin(newBoard, size, winCondition, row, col, getPlayer());
    if (hasWin) winner.current = getPlayer();
  };

  const onUndoClick = () => {
    const lastIndex = history.current.at(-1);
    if (!lastIndex || winner.current) return;

    history.current.pop();
    togglePlayer();
    decrementCount(getPlayer());

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastIndex] = null;
      return newBoard;
    });
  };

  const enableUndo = history.current.length > 0 && undoCounts[getPlayer(true)] > 0;

  return {
    board,
    player: getPlayer(),
    handlers: { board: onBoardClick, undo: onUndoClick },
    winner: winner.current,
    undoCounts,
    enableUndo,
  };
};
