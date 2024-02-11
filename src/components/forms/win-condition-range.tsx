import { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { BoardSize } from '@/lib';

const getRangeLabels = (boardSize: number) => {
  return Array.from({ length: boardSize - BoardSize.Size3 + 1 }, (_, i) => BoardSize.Size3 + i);
};

export default function WinConditionRange() {
  const { register, control, setValue } = useFormContext();
  const boardSize = useWatch({ control, name: 'size' });

  useEffect(() => {
    setValue('winCondition', boardSize);
  }, [boardSize, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-2xl font-semibold uppercase" htmlFor="winCondition">
        win condition
      </label>
      <input
        {...register('winCondition')}
        id="winConditione"
        type="range"
        min={BoardSize.Size3}
        max={boardSize}
        step={1}
        disabled={boardSize === BoardSize.Size3}
        className="accent-primary"
      />
      <ul className="flex justify-between">
        {getRangeLabels(boardSize).map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
