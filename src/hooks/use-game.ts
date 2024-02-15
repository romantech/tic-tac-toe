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
  const { undoCounts, isUndoUsed, undoControls } = useUndoCount(isSinglePlay);
  const { addHistory } = useGameHistory();

  const togglePlayer = useCallback(() => {
    currentPlayer.current = getOpponent(currentPlayer.current);
  }, []);

  const onBoardClick = useCallback(
    (boardIdx: BoardIdx, isBotTurn = false) => {
      if (board[boardIdx].identifier || winner.current.identifier) return;
      if (isBotTurn && currentPlayer.current === BasePlayer.X) return;

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
    undoControls.decrement(currentPlayer.current);
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
    undoControls.reset();
  };

  useEffect(() => {
    const isBotTurn = currentPlayer.current === BasePlayer.O && isSinglePlay;
    const gameNotEnded = !winner.current.identifier;
    let timer: number;

    if (isBotTurn && gameNotEnded) {
      const nextIndex = findBestMove(board, size, winCondition, currentPlayer.current);
      if (isNumber(nextIndex)) timer = setTimeout(() => onBoardClick(nextIndex, true), 300);
    }

    return () => clearTimeout(timer);
  }, [board, isSinglePlay, onBoardClick, size, winCondition]);

  const hasMark = sequence.current.length > 0;
  const hasWinner = Boolean(winner.current.identifier);
  const hasUndoCount = undoControls.getUndoCountBy(currentPlayer.current) > 0;

  const enabledReset = hasMark || isUndoUsed;
  const enableUndo = !hasWinner && hasMark && hasUndoCount;
  const enableBoard = !isSinglePlay ? true : currentPlayer.current === BasePlayer.X;

  return {
    board,
    currentPlayer: currentPlayer.current,
    handlers: { board: onBoardClick, undo, reset },
    controlStates: { undo: enableUndo, reset: enabledReset, board: enableBoard },
    winner: winner.current,
    undoCounts,
  };
};
