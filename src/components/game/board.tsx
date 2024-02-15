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
  const viewTypeBorderStyle = { 'border-slate-700': type === BoardType.View };

  return (
    <div
      className={clsx(
        'grid aspect-square w-full max-w-md select-none border-l-2 border-t-2 font-semibold',
        className,
        viewTypeBorderStyle,
      )}
    >
      {board.map(({ color, mark, sequence }, i) => {
        const isHighlightIdx = winner.indices?.includes(i);

        return (
          <Square
            className={clsx(viewTypeBorderStyle)}
            highlight={isHighlightIdx}
            dim={hasWinner && !isHighlightIdx}
            color={color}
            key={i}
            mark={mark}
            onClick={() => handleClick?.(i)}
            disabled={type !== BoardType.Play}
            sequence={sequence}
          />
        );
      })}
    </div>
  );
}
