import { clsx } from 'clsx';

import { TBoard } from '@/lib';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  className?: string;
}

const Square = ({ value, onClick, className }: SquareProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx('size-16 border-b-2 border-r-2 text-2xl', className)}
    >
      {value}
    </button>
  );
};

interface BoardProps {
  board: TBoard;
  handleClick: (i: number) => void;
  className?: string;
}

export default function Board({ board, handleClick, className }: BoardProps) {
  return (
    <div className={clsx('grid w-fit border-l-2 border-t-2', className)}>
      {board.map((square, i) => (
        <Square key={i} value={square} onClick={() => handleClick(i)} />
      ))}
    </div>
  );
}
