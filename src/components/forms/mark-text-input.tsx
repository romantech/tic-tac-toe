import { InputHTMLAttributes } from 'react';

import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface MarkTextInputProps extends InputProps {
  name: string;
}

export default function MarkTextInput({ name, className, ...inputProps }: MarkTextInputProps) {
  const { register } = useFormContext();

  return (
    <div className="flex items-center gap-2">
      <label className="capitalize">mark</label>
      <input
        className={clsx(className, 'w-7 px-2 text-slate-800')}
        type="text"
        maxLength={1}
        {...register(name)}
        {...inputProps}
      />
    </div>
  );
}
