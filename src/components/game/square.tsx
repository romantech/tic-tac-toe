import { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { NBSP, TMark, TSequence } from '@/lib';

interface SquareProps extends ComponentProps<'button'> {
  mark: TMark;
  sequence: TSequence;
  dim: boolean;
  highlight?: boolean;
  onClick: () => void;
  color?: string;
  className?: string;
}

export default function Square({
  dim,
  mark,
  onClick,
  highlight,
  className,
  color,
  sequence,
  ...buttonProps
}: SquareProps) {
  return (
    <button
      style={{ color }}
      type="button"
      onClick={onClick}
      className={clsx(
        'relative border-b-2 border-r-2 transition-all duration-500',
        { 'bg-slate-600': highlight },
        className,
      )}
      {...buttonProps}
    >
      {/* layout shift 방지를 위해 논브레이크 스페이스를 기본값으로 지정 */}
      <span className={clsx('inline-block', dim && 'opacity-50')}>{mark ?? NBSP}</span>
      <Sequence
        className={clsx({
          'text-slate-400': highlight,
          'text-slate-500': !highlight,
          invisible: !sequence || !buttonProps.disabled,
        })}
        sequence={sequence}
      />
    </button>
  );
}

interface SequenceProps {
  sequence: TSequence;
  className?: string;
}

const Sequence = ({ sequence, className }: SequenceProps) => {
  return (
    <span
      className={clsx(
        className,
        'absolute right-0 top-0 grid size-5 place-content-center text-xs font-medium',
      )}
    >
      {sequence}
    </span>
  );
};
