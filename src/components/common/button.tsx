import { ComponentProps } from 'react';

import { clsx } from 'clsx';

export default function Button({
  children,
  disabled,
  className,
  ...buttonProps
}: ComponentProps<'button'>) {
  return (
    <button
      className={clsx(
        'rounded-lg border-2 p-2 font-semibold transition-all hover:bg-slate-700',
        {
          'bg-slate-700 border-slate-500 text-slate-500 cursor-not-allowed': disabled,
          'border-slate-200': !disabled,
        },
        className,
      )}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
