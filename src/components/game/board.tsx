import { clsx } from 'clsx';

import { Square } from '@/components';
import { BoardType, TBoard, Winner } from '@/lib';

interface BoardProps {
  board: TBoard;
  winner: Winner;
  handleClick?: (i: number) => void;
  hideSequence?: boolean;
  className?: string;
  type?: BoardType;
}

export default function Board({
  board,
  handleClick,
  className,
  winner,
  hideSequence = false,
  type = BoardType.Play,
}: BoardProps) {
  const hasWinner = Boolean(winner.identifier);
  const viewTypeBorderStyle = { 'border-slate-700': type === BoardType.View };
  const boardClasses = clsx(
    'grid aspect-square w-full max-w-md select-none border-l-2 border-t-2 font-semibold',
    className,
    viewTypeBorderStyle,
  );

  return (
    <div className={boardClasses}>
      {board.map(({ color, mark, sequence }, i) => {
        const isHighlightIdx = winner.indices?.includes(i);

        return (
          <Square
            key={i}
            className={clsx(viewTypeBorderStyle)}
            highlight={isHighlightIdx}
            dim={hasWinner && !isHighlightIdx}
            color={color}
            mark={mark}
            onClick={() => handleClick?.(i)}
            disabled={type !== BoardType.Play}
            sequence={sequence}
            hideSequence={hideSequence || !sequence}
          />
        );
      })}
    </div>
  );
}
