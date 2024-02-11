import { Fragment } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { boardSize } from '@/lib';

export default function BoardSizeRadio() {
  const { control } = useFormContext();

  return (
    <fieldset className="flex items-center gap-3">
      <legend className="pb-3 text-2xl font-semibold uppercase">board size</legend>
      {/* radio value 는 문자열만 가능해서 숫자로 변경하기 위해 controller 사용 */}
      <Controller
        name="size"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Fragment>
            {boardSize.map((size) => (
              <div key={size} className="flex items-center gap-2">
                <input
                  id={`size-${size}`}
                  type="radio"
                  value={size}
                  checked={value === size}
                  onChange={({ target }) => onChange(+target.value)}
                  className="size-4 accent-primary"
                />
                <label htmlFor={`size-${size}`}>{`${size}x${size}`}</label>
              </div>
            ))}
          </Fragment>
        )}
      />
    </fieldset>
  );
}
