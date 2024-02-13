import { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { NBSP, TMark, TSequence } from '@/lib';

interface SquareProps extends ComponentProps<'button'> {
  mark: TMark;
  sequence: TSequence;
  dim: boolean;
  onClick: () => void;
  color?: string;
  className?: string;
}

export default function Square({
  dim,
  mark,
  onClick,
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
      className={clsx('relative border-b-2 border-r-2 transition-all duration-500', className)}
      {...buttonProps}
    >
      {/* layout shift 방지를 위해 논브레이크 스페이스를 기본값으로 지정 */}
      <span className={clsx('inline-block', dim && 'opacity-30')}>{mark ?? NBSP}</span>
      <Sequence sequence={sequence} hidden={!sequence || !buttonProps.disabled} />
    </button>
  );
}

interface SequenceProps {
  hidden: boolean;
  sequence: TSequence;
  className?: string;
}

const Sequence = ({ sequence, className, hidden }: SequenceProps) => {
  return (
    <span
      className={clsx(
        className,
        'absolute right-0 top-0 grid size-5 place-content-center text-xs font-normal text-slate-400',
        { hidden },
      )}
    >
      {sequence}
    </span>
  );
};
