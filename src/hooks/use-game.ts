import { useCallback, useRef, useState } from 'react';

import { createHistory, useUndoCount } from '@/hooks';
import { useGameHistory } from '@/hooks/use-game-history';
import {
  BasePlayer,
  BoardIdx,
  checkWin,
  createSquare,
  defaultSquare,
  defaultWinner,
  GameOption,
  getCoordinatesFromIdx,
  getInitialBoard,
  getPlayerMark,
  TBoard,
} from '@/lib';

export type UseGameReturnType = ReturnType<typeof useGame>;

export const useGame = ({ size, winCondition, firstPlayer, playerConfigs }: GameOption) => {
  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));
  const { undoCounts, decrementCount, resetCount } = useUndoCount();
  const { addHistory } = useGameHistory();

  const winner = useRef(defaultWinner);
  const sequence = useRef<Array<BoardIdx>>([]);
  const xIsNext = useRef(firstPlayer === BasePlayer.X);

  const getCurrentPlayer = useCallback((opposition = false) => {
    return getPlayerMark(opposition ? !xIsNext.current : xIsNext.current);
  }, []);

  const togglePlayer = useCallback(() => {
    xIsNext.current = !xIsNext.current;
  }, []);

  const onBoardClick = (boardIdx: BoardIdx) => {
    if (board[boardIdx].identifier || winner.current.identifier) return;

    sequence.current.push(boardIdx);
    const player = getCurrentPlayer();
    const { color, mark } = playerConfigs[player];

    const newBoard = [...board];
    newBoard[boardIdx] = createSquare(player, mark, sequence.current.length, color);
    setBoard(newBoard);

    const { row, col } = getCoordinatesFromIdx(boardIdx, size);
    const winIndices = checkWin(newBoard, size, winCondition, row, col, player);

    if (winIndices) winner.current = { identifier: player, indices: winIndices, mark };
    else togglePlayer();

    if (winIndices || sequence.current.length === newBoard.length) {
      const history = createHistory(newBoard, winner.current, size);
      addHistory(history);
    }
  };

  const undo = useCallback(() => {
    const lastBoardIdx = sequence.current.at(-1);
    if (lastBoardIdx === undefined || winner.current.identifier) return;

    sequence.current.pop();
    togglePlayer();
    decrementCount(getCurrentPlayer());

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastBoardIdx] = defaultSquare;
      return newBoard;
    });
  }, [decrementCount, getCurrentPlayer, togglePlayer]);

  const reset = useCallback(() => {
    setBoard(getInitialBoard(size));
    resetCount();
    winner.current = defaultWinner;
    sequence.current = [];
    xIsNext.current = firstPlayer === BasePlayer.X;
  }, [firstPlayer, resetCount, size]);

  const isStarted = sequence.current.length > 0;
  const isTied = isStarted && sequence.current.length === board.length;

  const hasWinner = Boolean(winner.current.identifier);
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
