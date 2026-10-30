import type { ComponentProps } from 'react';

import { useController } from 'react-hook-form';

interface PlayerColorPickerProps extends ComponentProps<'input'> {
  name: string;
}

export default function ColorPicker({ name, id = name, ...inputProps }: PlayerColorPickerProps) {
  const { field } = useController({ name });

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="capitalize text-slate-500">
        color
      </label>
      <div className="relative size-7 overflow-hidden rounded-full bg-amber-100">
        <input
          className="absolute inset-1/2 size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-slate-800"
          type="color"
          id={id}
          {...field}
          {...inputProps}
        />
      </div>
    </div>
  );
}
