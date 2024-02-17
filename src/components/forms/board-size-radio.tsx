import { Fragment } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Title } from '@/components';
import { BoardSize, boardSize } from '@/lib';

export default function BoardSizeRadio() {
  const { control } = useFormContext();

  return (
    <fieldset className="flex flex-col justify-center gap-2">
      <Title>board size</Title>
      <div className="flex justify-between gap-3.5">
        {/* radio value 는 문자열만 가능해서 숫자로 변경하기 위해 controller 사용 */}
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Fragment>
              {boardSize.map((size) => (
                <label key={size} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value={size}
                    checked={value === size}
                    onChange={({ target }) => onChange(+target.value)}
                    className="size-5 cursor-pointer appearance-none rounded-full border-2 border-slate-500 bg-slate-100 transition-all checked:border-4 checked:border-amber-600 checked:bg-primary"
                  />
                  <BoardDimension size={size} />
                </label>
              ))}
            </Fragment>
          )}
        />
      </div>
    </fieldset>
  );
}

const BoardDimension = ({ size }: { size: BoardSize | string }) => {
  return (
    <div className="flex items-center gap-1">
      <span>{size}</span>
      <span>x</span>
      <span>{size}</span>
    </div>
  );
};
