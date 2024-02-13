import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { GameHistory, TGameHistory } from '@/lib';

interface UseGameHistoryProps {
  historyKey?: string;
  maxHistory?: number;
}

const INITIAL_VALUE: TGameHistory[] = [];

export const useGameHistory = ({
  historyKey = GameHistory.Key,
  maxHistory = GameHistory.Max,
}: UseGameHistoryProps = {}) => {
  const [historyList, setHistoryList] = useLocalStorage<TGameHistory[]>(historyKey, INITIAL_VALUE);

  const addHistory = useCallback(
    (history: TGameHistory) => {
      setHistoryList((prev) => {
        const newHistory = [history, ...prev];
        if (newHistory.length > maxHistory) return newHistory.slice(0, maxHistory);
        return newHistory;
      });
    },
    [maxHistory, setHistoryList],
  );

  const clearHistory = useCallback(() => {
    setHistoryList(INITIAL_VALUE);
  }, [setHistoryList]);

  return { historyList, addHistory, clearHistory } as const;
};
