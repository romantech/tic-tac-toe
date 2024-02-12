import { clsx } from 'clsx';

import { Square } from '@/components';
import { BoardType, TBoard, Winner } from '@/lib';

interface BoardProps {
  board: TBoard;
  winner: Winner;
  handleClick?: (i: number) => void;
  className?: string;
  type?: BoardType;
}

export default function Board({
  board,
  handleClick,
  className,
  winner,
  type = BoardType.Play,
}: BoardProps) {
  const hasWinner = Boolean(winner.identifier);

  return (
    <div
      className={clsx('grid aspect-square border-l-2 border-t-2 font-semibold', className, {
        'w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-3/12': type === 'play',
      })}
    >
      {board.map(({ color, mark, sequence }, i) => {
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
            sequence={sequence}
          />
        );
      })}
    </div>
  );
}
