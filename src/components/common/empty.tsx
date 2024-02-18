import { ComponentProps, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

interface EmptyProps extends ComponentProps<'h1'> {
  className?: string;
  hidden?: boolean;
}

export default function Empty({
  children,
  className,
  hidden = false,
  ...headingProps
}: PropsWithChildren<EmptyProps>) {
  if (hidden) return null;
  return (
    <h1 className={clsx('text-4xl font-extrabold', className)} {...headingProps}>
      {children}
    </h1>
  );
}
