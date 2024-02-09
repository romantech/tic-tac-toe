import { clsx } from 'clsx';

import { TBoard } from '@/lib';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  className?: string;
}

const Square = ({ value, onClick, className }: SquareProps) => {
  return (
    <button type="button" onClick={onClick} className={clsx('border-b-2 border-r-2', className)}>
      {value ?? '\u00A0'}
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
    <div
      className={clsx(
        'grid aspect-square w-11/12 rounded border-l-2 border-t-2 md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-3/12',
        className,
      )}
    >
      {board.map((square, i) => (
        <Square key={i} value={square} onClick={() => handleClick(i)} />
      ))}
    </div>
  );
}
