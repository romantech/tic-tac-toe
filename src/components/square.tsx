import { clsx } from 'clsx';

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

export default Square;
