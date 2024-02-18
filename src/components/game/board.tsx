import { clsx } from 'clsx';

import { Square } from '@/components';
import { BoardType, getPlayModeSquareClasses, TBoard, Winner } from '@/lib';

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
    ['grid aspect-square w-full max-w-md select-none overflow-hidden font-bold', className],
    { 'border-l-2 border-t-2 border-slate-700': isViewMode },
  );

  return (
    <div className={boardClasses}>
      {board.map(({ color, mark, sequence }, i) => {
        const isHighlightIdx = winner.indices?.includes(i);
        const squareClasses = clsx({
          'border-b-2 border-r-2 border-slate-700': isViewMode,
          [getPlayModeSquareClasses(board.length, i)]: !isViewMode,
        });

        return (
          <Square
            key={i}
            className={squareClasses}
            highlight={isHighlightIdx}
            dim={hasWinner && !isHighlightIdx}
            size={Math.sqrt(board.length)}
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
