import { useRef, useState } from 'react';

import { Board } from '@/components';
import { checkWin, getLastMove, getPlayer, Player, TBoard } from '@/lib';

const boardConfigs = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
} as const;

type BoardSizes = keyof typeof boardConfigs;

interface GameProps {
  /** 보드 크기 */
  size?: BoardSizes;
  /** 승리 조건 */
  winCondition?: BoardSizes;
  /** 첫번째 플레이어 */
  firstPlayer?: Player;
}

export default function Game({ firstPlayer, size = 5, winCondition = 3 }: GameProps) {
  const [board, setBoard] = useState<TBoard>(Array(size * size).fill(null));

  const winner = useRef<Player | null>(null);
  const history = useRef<Array<number>>([]);
  const xIsNext = useRef(firstPlayer === Player.X);

  const player = getPlayer(xIsNext.current);

  const handleClick = (i: number) => {
    if (board[i] || winner.current) return;

    const newBoard = [...board];
    newBoard[i] = player;
    setBoard(newBoard);
    xIsNext.current = !xIsNext.current;
    history.current.push(i);

    const { row, col } = getLastMove(i, size);
    const hasWin = checkWin(newBoard, size, winCondition, row, col, player);
    if (hasWin) winner.current = player;
  };

  const onUndoClick = () => {
    const lastIndex = history.current.at(-1);
    if (!lastIndex || winner.current) return;

    history.current.pop();
    xIsNext.current = !xIsNext.current;

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[lastIndex] = null;
      return newBoard;
    });
  };

  return (
    <div className="text-white">
      <Board board={board} handleClick={handleClick} className={boardConfigs[size]} />
      <button disabled={!history.current.length} onClick={onUndoClick}>
        Undo
      </button>
      <h1>{winner.current ? `Winner: ${winner.current}` : `Next Player: ${player}`}</h1>
    </div>
  );
}
