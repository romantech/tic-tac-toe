import { clsx } from 'clsx';

import { Square } from '@/components';
import { BoardType, TBoard, Winner } from '@/lib';

const getPlayModeSquareBorderStyle = (totalSquares: number, index: number) => {
  const size = Math.sqrt(totalSquares);
  const rightBorder = 'border-r-4';
  const bottomBorder = 'border-b-4';

  const classes: string[] = ['border-slate-300'];

  const isLastSquareInRow = (index + 1) % size === 0;
  if (!isLastSquareInRow) classes.push(rightBorder);

  const isLastRowSquare = index >= totalSquares - size;
  if (!isLastRowSquare) classes.push(bottomBorder);

  return classes;
};

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
  const isViewMode = type === BoardType.View;

  const boardClasses = clsx(
    'grid aspect-square w-full max-w-md select-none overflow-hidden font-semibold',
    [isViewMode && 'border-l-2 border-t-2 border-slate-700', className],
  );

  return (
    <div className={boardClasses}>
      {board.map(({ color, mark, sequence }, i) => {
        const isHighlightIdx = winner.indices?.includes(i);
        const squareClass = clsx(
          isViewMode && 'border-b-2 border-r-2 border-slate-700',
          !isViewMode && getPlayModeSquareBorderStyle(board.length, i),
        );

        return (
          <Square
            key={i}
            className={squareClass}
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
