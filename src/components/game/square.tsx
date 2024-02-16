import { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { NBSP, TMark, TSequence } from '@/lib';

interface SquareProps extends ComponentProps<'button'> {
  mark: TMark;
  onClick: () => void;
  sequence: TSequence;
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
  highlight = false,
  dim = false,
  hideSequence = false,
  ...buttonProps
}: SquareProps) {
  const buttonClasses = clsx(
    'relative transition-all duration-500',
    highlight && 'bg-slate-600',
    className,
  );
  const markClasses = clsx('inline-block', dim && 'opacity-50');
  const sequenceClasses = clsx(
    'absolute right-0 top-0 grid size-5 place-content-center text-xs font-medium transition-all duration-300',
    [highlight ? 'text-slate-400' : 'text-slate-500', hideSequence && 'invisible opacity-0'],
  );

  return (
    <button
      type="button"
      style={{ color }}
      onClick={onClick}
      className={buttonClasses}
      {...buttonProps}
    >
      {/* layout shift 방지를 위해 논브레이크 스페이스를 기본값으로 지정 */}
      <span className={markClasses}>{mark ?? NBSP}</span>
      <span className={sequenceClasses}>{sequence}</span>
    </button>
  );
}
