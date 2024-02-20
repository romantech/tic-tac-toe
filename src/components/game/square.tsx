import { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { BoardSize, TMark, TSequence } from '@/lib';

interface SquareProps extends ComponentProps<'button'> {
  mark: TMark;
  onClick: () => void;
  sequence: TSequence;
  size: BoardSize;
  hideSequence?: boolean;
  dim?: boolean;
  highlight?: boolean;
  color?: string;
  className?: string;
}

export default function Square({
  mark,
  onClick,
  className,
  color,
  sequence,
  size,
  highlight = false,
  dim = false,
  hideSequence = false,
  ...buttonProps
}: SquareProps) {
  const buttonClasses = clsx(
    'relative transition-all duration-300',
    { 'bg-slate-600': highlight },
    className,
  );
  const markClasses = clsx('inline-block', {
    'animate-blink-2': highlight && !buttonProps.disabled,
    'opacity-50': dim,
  });
  const sequenceClasses = clsx(
    'absolute grid place-content-center font-normal transition-all duration-300',
    {
      'invisible opacity-0': hideSequence,
      'text-slate-400': highlight,
      'text-slate-500': !highlight,
    },
    getSequenceTextClasses(size),
  );

  return (
    <button
      type="button"
      style={{ color }}
      onClick={onClick}
      className={buttonClasses}
      {...buttonProps}
    >
      <span className={markClasses}>{mark}</span>
      <span className={sequenceClasses}>{sequence}</span>
    </button>
  );
}

const getSequenceTextClasses = (size: BoardSize) => {
  switch (size) {
    case BoardSize.Size3:
      return 'text-lg top-0.5 right-1.5';
    case BoardSize.Size4:
      return 'text-base top-0 right-1';
    case BoardSize.Size5:
      return 'text-sm top-0 right-0.5';
    case BoardSize.Size6:
      return 'text-xs top-0 right-0.5';
    default:
      throw new Error(`Invalid size: ${size}`);
  }
};
