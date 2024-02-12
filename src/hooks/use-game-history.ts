import { useCallback } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { GameHistory } from '@/lib';

export const useGameHistory = () => {
  const [gameHistory, setGameHistory] = useLocalStorage<GameHistory[]>('tic-tac-toe-history', []);

  const addHistory = useCallback(
    (history: GameHistory) => {
      setGameHistory((prev) => [history, ...prev]);
    },
    [setGameHistory],
  );

  return { gameHistory, addHistory };
};
