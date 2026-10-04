import { clsx } from 'clsx';
import type { ComponentProps, PropsWithChildren } from 'react';

interface MenuHeaderProps extends ComponentProps<'header'> {
  className?: string;
}

const Header = ({ className, children, ...headerProps }: PropsWithChildren<MenuHeaderProps>) => {
  return (
    <header
      {...headerProps}
      className={clsx(
        'sticky top-0 z-10 flex min-h-16 items-center justify-center gap-3 bg-slate-700/10 px-4 shadow backdrop-blur',
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
