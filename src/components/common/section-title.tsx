import { HTMLAttributes } from 'react';

import { clsx } from 'clsx';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export default function SectionTitle({ className, children, ...headingProps }: SectionTitleProps) {
  return (
    <h2 className={clsx('pb-1 text-2xl font-semibold uppercase', className)} {...headingProps}>
      {children}
    </h2>
  );
}
