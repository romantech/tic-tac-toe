import { useCallback, useEffect, useRef, useState } from 'react';

import { useUndoCount } from '@/hooks';
import { useGameHistory } from '@/hooks/use-game-history';
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
  TBoard,
} from '@/lib';

export type UseGameReturnType = ReturnType<typeof useGame>;

export const useGame = ({
  size,
  winCondition,
  firstPlayer,
  playerConfigs,
  withBot,
}: GameOption) => {
  const [board, setBoard] = useState<TBoard>(getInitialBoard(size));

  const { undoCounts, decrementCount, resetCount, getUndoCountByPlayer } = useUndoCount(withBot);
  const { addHistory } = useGameHistory();

  const currentPlayer = useRef<BasePlayer>(firstPlayer);
  const winner = useRef(defaultWinner);
  const sequence = useRef<Array<BoardIdx>>([]);

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
    if (lastBoardIdx === undefined || winner.current.identifier) return;

    const sliceCount = withBot ? 2 : 1;
    sequence.current.splice(sliceCount * -1);
    decrementCount(currentPlayer.current);
    if (!withBot) togglePlayer();

    setBoard((prev) => {
      const newBoard = [...prev];
      if (withBot && secondLastBoardIdx !== undefined) newBoard[secondLastBoardIdx] = defaultSquare;
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

  const isStarted = sequence.current.length > 0;
  const isTied = isStarted && sequence.current.length === board.length;

  const hasWinner = Boolean(winner.current.identifier);
  const hasUndoCount = getUndoCountByPlayer(currentPlayer.current) > 0;

  const enableUndo = !hasWinner && !isTied && hasUndoCount;

  useEffect(() => {
    if (currentPlayer.current === BasePlayer.O && withBot) {
      const nextIndex = findBestMove(board, size, winCondition, currentPlayer.current);
      if (nextIndex !== null) onBoardClick(nextIndex);
    }
  }, [board, hasWinner, onBoardClick, size, winCondition, withBot]);

  return {
    board,
    currentPlayer: currentPlayer.current,
    handlers: { board: onBoardClick, undo, reset },
    buttonStatus: { undo: enableUndo, reset: isStarted },
    winner: winner.current,
    undoCounts,
  };
};
