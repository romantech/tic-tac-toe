import { cloneElement, isValidElement, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

interface IconButtonProps {
  className?: string;
  size?: number;
  onClick: () => void;
}

export default function IconButton({
  className,
  size = 24,
  children,
  onClick,
}: PropsWithChildren<IconButtonProps>) {
  if (!isValidElement(children)) {
    throw new Error('children must be a valid react element');
  }

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
        ...children.props,
        width: size,
        height: size,
      })}
    </button>
  );
}
