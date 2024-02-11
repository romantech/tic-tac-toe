import { useCallback, useState } from 'react';

import { MAX_UNDO_COUNT, Player } from '@/lib';

const defaultValues = { [Player.X]: MAX_UNDO_COUNT, [Player.O]: MAX_UNDO_COUNT };
export type UndoCounts = typeof defaultValues;

export const useUndoCount = () => {
  const [undoCounts, setUndoCounts] = useState<UndoCounts>(defaultValues);

  const decrementCount = useCallback((player: Player) => {
    setUndoCounts((prev) => ({ ...prev, [player]: prev[player] - 1 }));
  }, []);

  const resetCount = useCallback(() => {
    setUndoCounts(defaultValues);
  }, []);

  return { undoCounts, decrementCount, resetCount };
};
