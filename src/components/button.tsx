import { ButtonHTMLAttributes } from 'react';

import { clsx } from 'clsx';

export default function Button({
  children,
  disabled,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx('rounded-lg border-2 px-4 py-2 text-lg font-semibold', {
        'bg-slate-700 border-slate-500 text-slate-400 cursor-not-allowed': disabled,
      })}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
