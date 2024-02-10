import { useCallback, useState } from 'react';

import { Player } from '@/lib';

const MAX_COUNT = 3;

export const useUndoCount = () => {
  const [undoCounts, setUndoCounts] = useState({ [Player.X]: MAX_COUNT, [Player.O]: MAX_COUNT });

  const decrementCount = useCallback((player: Player) => {
    setUndoCounts((prev) => ({ ...prev, [player]: prev[player] - 1 }));
  }, []);

  return { undoCounts, decrementCount };
};
