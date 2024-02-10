import { useCallback, useState } from 'react';

import { Player } from '@/lib';

const MAX_COUNT = 3;
const defaultValues = { [Player.X]: MAX_COUNT, [Player.O]: MAX_COUNT };
export type UndoCounts = typeof defaultValues;

export const useUndoCount = () => {
  const [undoCounts, setUndoCounts] = useState<UndoCounts>(defaultValues);

  const decrementCount = useCallback((player: Player) => {
    setUndoCounts((prev) => ({ ...prev, [player]: prev[player] - 1 }));
  }, []);

  return { undoCounts, decrementCount };
};
