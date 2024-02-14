import { useState } from 'react';

import { BasePlayer, getOpponent, MAX_UNDO_COUNT } from '@/lib';

export type UndoCounts = ReturnType<typeof getDefaultValues>;

const getDefaultValues = (isSinglePlay: boolean) => ({
  [BasePlayer.X]: MAX_UNDO_COUNT,
  [BasePlayer.O]: isSinglePlay ? 0 : MAX_UNDO_COUNT,
});

export const useUndoCount = (isSinglePlay: boolean) => {
  const [undoCounts, setUndoCounts] = useState<UndoCounts>(getDefaultValues(isSinglePlay));

  const decrementCount = (player: BasePlayer) => {
    const target = isSinglePlay ? BasePlayer.X : getOpponent(player);
    setUndoCounts((prev) => ({ ...prev, [target]: prev[target] - 1 }));
  };

  const resetCount = () => {
    setUndoCounts(getDefaultValues(isSinglePlay));
  };

  const getUndoCountBy = (player: BasePlayer) => {
    const target = isSinglePlay ? BasePlayer.X : getOpponent(player);
    return undoCounts[target];
  };

  return { undoCounts, decrementCount, resetCount, getUndoCountBy };
};
