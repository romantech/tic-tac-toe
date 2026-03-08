import { cloneElement, ReactElement, SVGProps } from 'react';

import { clsx } from 'clsx';

interface IconButtonProps {
  className?: string;
  size?: number;
  children: ReactElement<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export default function IconButton({ className, size = 24, children, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full bg-slate-700 p-2 text-slate-200 shadow transition-all duration-300 hover:bg-slate-600/80',
        className,
      )}
    >
      {cloneElement(children, {
        width: size,
        height: size,
      })}
    </button>
  );
}
