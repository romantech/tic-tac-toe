import { HTMLAttributes, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

interface EmptyProps extends HTMLAttributes<HTMLHeadingElement> {
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
    <h1 className={clsx('text-5xl font-bold capitalize', className)} {...headingProps}>
      {children}
    </h1>
  );
}
