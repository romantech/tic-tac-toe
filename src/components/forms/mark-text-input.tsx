import { ComponentProps } from 'react';

import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

interface MarkTextInputProps extends ComponentProps<'input'> {
  name: string;
}

export default function MarkTextInput({ name, className, ...inputProps }: MarkTextInputProps) {
  const { register } = useFormContext();

  return (
    <div className="flex items-center gap-2">
      <label className="capitalize text-slate-500">mark</label>
      <input
        className={clsx(
          className,
          'w-7 rounded-sm bg-slate-200 px-1.5 text-center text-slate-800 outline-slate-400',
        )}
        type="text"
        maxLength={1}
        {...register(name)}
        {...inputProps}
      />
    </div>
  );
}
