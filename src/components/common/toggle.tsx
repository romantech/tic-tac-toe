import { ComponentProps } from 'react';

import { clsx } from 'clsx';

const sizeClasses = {
  sm: 'h-4 w-8 after:size-3.5',
  md: 'h-6 w-11 after:size-5',
  lg: 'h-8 w-14 after:size-7',
} as const;

export interface ToggleProps extends Omit<ComponentProps<'input'>, 'size'> {
  className?: string;
  size?: keyof typeof sizeClasses;
}

export default function Toggle({ className, size = 'md', ...inputProps }: ToggleProps) {
  return (
    <label className={clsx('inline-flex cursor-pointer items-center', className)}>
      <input type="checkbox" className="peer sr-only" {...inputProps} />
      <div
        className={clsx(
          'peer relative rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[""] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-yellow-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-slate-500 dark:peer-focus:ring-slate-500',
          sizeClasses[size],
        )}
      ></div>
    </label>
  );
}
