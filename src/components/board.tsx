import { useRef, useState } from 'react';

import { clsx } from 'clsx';

import { Square } from '@/components';

const boardConfigs = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
} as const;

type BoardSizes = keyof typeof boardConfigs;

enum Player {
  X = 'X', // first player
  O = 'O', // second player
}

interface BoardProps {
  /** 보드 크기 */
  size?: BoardSizes;
  /** 승리 조건 */
  winCondition?: BoardSizes;
  /** 첫번째 플레이어 */
  firstPlayer?: Player;
}

export default function Board({ firstPlayer, size = 3, winCondition = 3 }: BoardProps) {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const xIsNext = useRef(firstPlayer === Player.X);

  const handleClick = (i: number) => {
    const newBoard = [...board];
    if (newBoard[i]) return;

    newBoard[i] = xIsNext.current ? Player.X : Player.O;
    setBoard(newBoard);
    xIsNext.current = !xIsNext.current;
  };

  return (
    <div className={clsx('grid w-fit border-l-2 border-t-2 text-white', boardConfigs[size])}>
      {board.map((square, i) => (
        <Square key={i} value={square} onClick={() => handleClick(i)} />
      ))}
    </div>
  );
}
