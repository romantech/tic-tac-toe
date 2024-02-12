import { useCallback, useState } from 'react';

import { BasePlayer, MAX_UNDO_COUNT } from '@/lib';

const defaultValues = { [BasePlayer.X]: MAX_UNDO_COUNT, [BasePlayer.O]: MAX_UNDO_COUNT };
export type UndoCounts = typeof defaultValues;

export const useUndoCount = () => {
  const [undoCounts, setUndoCounts] = useState<UndoCounts>(defaultValues);

  const decrementCount = useCallback((player: BasePlayer) => {
    setUndoCounts((prev) => ({ ...prev, [player]: prev[player] - 1 }));
  }, []);

  const resetCount = useCallback(() => {
    setUndoCounts(defaultValues);
  }, []);

  return { undoCounts, decrementCount, resetCount };
};
