import { useEffect } from 'react';

import { clsx } from 'clsx';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { BoardSize } from '@/lib';

const getRangeLabels = (boardSize: number) => {
  return Array.from({ length: boardSize - BoardSize.Size3 + 1 }, (_, i) => BoardSize.Size3 + i);
};

export default function WinConditionRange() {
  const { control, setValue } = useFormContext();
  const [boardSize, winCondition] = useWatch({ control, name: ['size', 'winCondition'] });

  useEffect(() => {
    setValue('winCondition', boardSize);
  }, [boardSize, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <label className="pb-1 text-2xl font-semibold uppercase" htmlFor="winCondition">
        win condition
      </label>
      <Controller
        control={control}
        name="winCondition"
        render={({ field: { onChange, value } }) => (
          <input
            id="winCondition"
            type="range"
            min={BoardSize.Size3}
            max={boardSize}
            onChange={({ target }) => {
              onChange(+target.value);
            }}
            step={1}
            value={value}
            disabled={boardSize === BoardSize.Size3}
            className="cursor-pointer accent-primary"
          />
        )}
      />

      <ul className="flex justify-between">
        {getRangeLabels(boardSize).map((label) => (
          <li
            className={clsx('rounded-full bg-slate-600 px-2 py-0.5 text-sm', {
              'bg-primary text-slate-800 font-semibold': label === winCondition,
            })}
            key={label}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
