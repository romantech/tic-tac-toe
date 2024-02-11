import { Fragment } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { boardSize } from '@/lib';

export default function SizeField() {
  const { control } = useFormContext();

  return (
    <fieldset className="flex items-center gap-3">
      <legend className="capitalize">board size</legend>
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
