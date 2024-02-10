import { clsx } from 'clsx';

import { NBSP, PlayersInfo, TBoard, Winner } from '@/lib';

interface SquareProps {
  mark: string | null;
  dim: boolean;
  onClick: () => void;
  color?: string;
  className?: string;
}

const Square = ({ dim, mark, onClick, className, color }: SquareProps) => {
  return (
    <button
      style={{ color }}
      type="button"
      onClick={onClick}
      className={clsx('border-b-2 border-r-2', className)}
    >
      {/* layout shift 방지를 위해 논브레이크 스페이스를 기본값으로 지정 */}
      <span className={clsx('inline-block', dim && 'opacity-30')}>{mark ?? NBSP}</span>
    </button>
  );
};

interface BoardProps {
  board: TBoard;
  handleClick: (i: number) => void;
  className?: string;
  playersInfo: PlayersInfo;
  winner: Winner;
}

export default function Board({ board, handleClick, className, playersInfo, winner }: BoardProps) {
  const hasWinner = Boolean(winner.player);

  return (
    <div
      className={clsx(
        'grid aspect-square w-11/12 border-l-2 border-t-2 font-semibold md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-3/12',
        className,
      )}
    >
      {board.map((square, i) => {
        const mark = square ? playersInfo[square].customMark : null;
        const color = square ? playersInfo[square].color : 'transparent';
        const isHighlightIdx = winner.indices?.has(i);

        return (
          <Square
            className={clsx({ 'bg-slate-600': isHighlightIdx })}
            dim={hasWinner && !isHighlightIdx}
            color={color}
            key={i}
            mark={mark}
            onClick={() => handleClick(i)}
          />
        );
      })}
    </div>
  );
}
