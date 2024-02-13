import { ComponentProps } from 'react';

import { useFormContext } from 'react-hook-form';

interface PlayerColorPickerProps extends ComponentProps<'input'> {
  name: string;
}

export default function ColorPicker({ name, ...inputProps }: PlayerColorPickerProps) {
  const { register } = useFormContext();

  return (
    <div className="flex items-center gap-2">
      <label className="capitalize text-slate-500">color</label>
      <div className="relative size-7 overflow-hidden rounded-full bg-amber-100">
        <input
          className="absolute -inset-1/2 size-12 cursor-pointer bg-slate-800"
          type="color"
          {...register(name)}
          {...inputProps}
        />
      </div>
    </div>
  );
}
