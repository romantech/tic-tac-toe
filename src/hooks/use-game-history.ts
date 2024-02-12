import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { BoardSize, BoardType, getBoardConfig, TBoard, Winner } from '@/lib';

export type GameHistory = ReturnType<typeof createHistory>;
export const createHistory = (board: TBoard, winner: Winner, size: BoardSize) => ({
  board,
  winner,
  boardConfigs: getBoardConfig(size, BoardType.View),
  createdAt: new Date().toISOString(),
});

interface UseGameHistoryProps {
  historyKey?: string;
  maxHistory?: number;
}

export const useGameHistory = ({
  historyKey = 'tic-tac-toe-history',
  maxHistory = 20,
}: UseGameHistoryProps = {}) => {
  const [gameHistory, setGameHistory] = useLocalStorage<GameHistory[]>(historyKey, []);

  const addHistory = useCallback(
    (history: GameHistory) => {
      setGameHistory((prev) => {
        const newHistory = [history, ...prev];
        if (newHistory.length > maxHistory) return newHistory.slice(0, maxHistory);
        return newHistory;
      });
    },
    [maxHistory, setGameHistory],
  );

  return { gameHistory, addHistory };
};
