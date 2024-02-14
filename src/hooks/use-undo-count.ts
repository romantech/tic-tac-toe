import { useState } from 'react';

import { BasePlayer, getOpponent, MAX_UNDO_COUNT } from '@/lib';

export type UndoCounts = ReturnType<typeof getDefaultValues>;

const getDefaultValues = (withBot: boolean) => ({
  [BasePlayer.X]: MAX_UNDO_COUNT,
  [BasePlayer.O]: withBot ? 0 : MAX_UNDO_COUNT,
});

export const useUndoCount = (withBot = true) => {
  const [undoCounts, setUndoCounts] = useState<UndoCounts>(getDefaultValues(withBot));

  const decrementCount = (player: BasePlayer) => {
    const target = withBot ? BasePlayer.X : getOpponent(player);
    setUndoCounts((prev) => ({ ...prev, [target]: prev[target] - 1 }));
  };

  const resetCount = () => {
    setUndoCounts(getDefaultValues(withBot));
  };

  const getUndoCountByPlayer = (player: BasePlayer) => {
    const target = withBot ? BasePlayer.X : getOpponent(player);
    return undoCounts[target];
  };

  return { undoCounts, decrementCount, resetCount, getUndoCountByPlayer };
};
