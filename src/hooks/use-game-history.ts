import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { GameHistory } from '@/lib';

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
