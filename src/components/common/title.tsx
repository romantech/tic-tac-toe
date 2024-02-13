import { ComponentProps } from 'react';

import { clsx } from 'clsx';

interface SectionTitleProps extends ComponentProps<'h2'> {
  className?: string;
}

export default function Title({ className, children, ...headingProps }: SectionTitleProps) {
  return (
    <h2 className={clsx('pb-1 text-2xl font-semibold uppercase', className)} {...headingProps}>
      {children}
    </h2>
  );
}
