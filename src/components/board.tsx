import { ButtonHTMLAttributes } from 'react';

import { clsx } from 'clsx';

import { BoardType, NBSP, PlayerConfigs, TBoard, Winner } from '@/lib';

interface SquareProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mark: string | null;
  dim: boolean;
  onClick: () => void;
  color?: string;
  className?: string;
}

const Square = ({ dim, mark, onClick, className, color, ...buttonsProps }: SquareProps) => {
  return (
    <button
      style={{ color }}
      type="button"
      onClick={onClick}
      className={clsx('border-b-2 border-r-2', className)}
      {...buttonsProps}
    >
      {/* layout shift 방지를 위해 논브레이크 스페이스를 기본값으로 지정 */}
      <span className={clsx('inline-block', dim && 'opacity-30')}>{mark ?? NBSP}</span>
    </button>
  );
};

interface BoardProps {
  board: TBoard;
  playerConfigs: PlayerConfigs;
  winner: Winner;
  handleClick?: (i: number) => void;
  className?: string;
  type?: BoardType;
}

export default function Board({
  board,
  handleClick,
  className,
  playerConfigs,
  winner,
  type = 'play',
}: BoardProps) {
  const hasWinner = Boolean(winner.player);

  return (
    <div
      className={clsx('grid aspect-square border-l-2 border-t-2 font-semibold', className, {
        'w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-3/12': type === 'play',
      })}
    >
      {board.map((square, i) => {
        const mark = square ? playerConfigs[square].mark : null;
        const color = square ? playerConfigs[square].color : 'transparent';
        const isHighlightIdx = winner.indices?.includes(i);

        return (
          <Square
            className={clsx({ 'bg-slate-600': isHighlightIdx })}
            dim={hasWinner && !isHighlightIdx}
            color={color}
            key={i}
            mark={mark}
            onClick={() => handleClick?.(i)}
            disabled={type !== 'play'}
          />
        );
      })}
    </div>
  );
}
