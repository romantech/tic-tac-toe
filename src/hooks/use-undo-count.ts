import { useState } from 'react';

import { BasePlayer, getOpponent, MAX_UNDO_COUNT } from '@/lib';

export type UndoCounts = typeof defaultUndoValues;
const defaultUndoValues = {
  [BasePlayer.X]: MAX_UNDO_COUNT,
  [BasePlayer.O]: MAX_UNDO_COUNT,
} as const;

export const useUndoCount = (isSinglePlay: boolean) => {
  const [undoCounts, setUndoCounts] = useState(defaultUndoValues);

  const decrement = (player: BasePlayer) => {
    const target = isSinglePlay ? BasePlayer.X : getOpponent(player);
    setUndoCounts((prev) => ({ ...prev, [target]: prev[target] - 1 }));
  };

  const reset = () => setUndoCounts(defaultUndoValues);

  const getUndoCountBy = (player: BasePlayer) => {
    const target = isSinglePlay ? BasePlayer.X : getOpponent(player);
    return undoCounts[target];
  };

  const isUndoUsed = Object.values(undoCounts).some((count) => count < MAX_UNDO_COUNT);

  const undoControls = { decrement, reset, getUndoCountBy };

  return { undoCounts, isUndoUsed, undoControls };
};
