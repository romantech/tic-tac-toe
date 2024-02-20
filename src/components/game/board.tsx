import { clsx } from 'clsx';

import { Square } from '@/components';
import { BoardSize, BoardType, TBoard, Winner } from '@/lib';

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
  const size = Math.sqrt(board.length);

  const boardClasses = clsx(
    'grid aspect-square w-full max-w-md select-none overflow-hidden font-bold',
    { 'border-l-2 border-t-2 border-slate-700': isViewMode },
    [getBoardLayoutClasses(size, type), className],
  );

  return (
    <div className={boardClasses}>
      {board.map(({ color, mark, sequence }, i) => {
        const shouldHighlight = winner.indices?.includes(i);
        const squareClasses = clsx({
          'border-b-2 border-r-2 border-slate-700': isViewMode,
          [getPlayModeSquareClasses(board.length, i)]: !isViewMode,
        });

        return (
          <Square
            key={i}
            className={squareClasses}
            highlight={shouldHighlight}
            dim={hasWinner && !shouldHighlight}
            size={size}
            color={color}
            mark={mark}
            onClick={() => handleClick?.(i)}
            disabled={isViewMode}
            sequence={sequence}
            hideSequence={hideSequence || !sequence}
          />
        );
      })}
    </div>
  );
}

const getBoardLayoutClasses = (size: BoardSize, type: BoardType = BoardType.Play) => {
  const boardConfig = {
    [BoardSize.Size3]: {
      [BoardType.Play]: 'grid-cols-3 text-7xl sm:text-8xl',
      [BoardType.View]: 'grid-cols-3 text-6xl',
    },
    [BoardSize.Size4]: {
      [BoardType.Play]: 'grid-cols-4 text-6xl sm:text-7xl',
      [BoardType.View]: 'grid-cols-4 text-5xl',
    },
    [BoardSize.Size5]: {
      [BoardType.Play]: 'grid-cols-5 text-5xl sm:text-6xl',
      [BoardType.View]: 'grid-cols-5 text-4xl',
    },
    [BoardSize.Size6]: {
      [BoardType.Play]: 'grid-cols-6 text-4xl sm:text-5xl',
      [BoardType.View]: 'grid-cols-6 text-3xl',
    },
  };

  return boardConfig[size][type];
};

const getPlayModeSquareClasses = (totalSquares: number, index: number) => {
  const size = Math.sqrt(totalSquares);
  const rightBorder = size > 4 ? 'border-r-[3px]' : 'border-r-4';
  const bottomBorder = size > 4 ? 'border-b-[3px]' : 'border-b-4';

  const classes: string[] = ['border-slate-200'];

  const isLastSquareInRow = (index + 1) % size === 0;
  if (!isLastSquareInRow) classes.push(rightBorder);

  const isLastRowSquare = index >= totalSquares - size;
  if (!isLastRowSquare) classes.push(bottomBorder);

  return classes.join(' ');
};
