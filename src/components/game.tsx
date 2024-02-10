import { useRef, useState } from 'react';

import { Board, TurnIndicator } from '@/components';
import { checkWin, getLastMove, getPlayer, Player, TBoard } from '@/lib';

const boardConfigs = {
  3: 'grid-cols-3 text-7xl lg:text-8xl',
  4: 'grid-cols-4 text-6xl lg:text-7xl',
  5: 'grid-cols-5 text-5xl lg:text-6xl',
  6: 'grid-cols-6 text-4xl lg:text-5xl',
  7: 'grid-cols-7 text-3xl lg:text-4xl',
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

export default function Game({ firstPlayer, size = 3, winCondition = 3 }: GameProps) {
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
    <div className="mx-auto flex size-full flex-col items-center gap-4 py-20 text-slate-200 md:px-8">
      <Board board={board} handleClick={handleClick} className={boardConfigs[size]} />
      <TurnIndicator currentPlayer={player} />
      <button disabled={!history.current.length} onClick={onUndoClick}>
        Undo
      </button>
      <h1>{winner.current ? `Winner: ${winner.current}` : `Next Player: ${player}`}</h1>
    </div>
  );
}
