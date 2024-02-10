import { useRef, useState } from 'react';

import { Board, TurnIndicator } from '@/components';
import {
  boardConfigs,
  BoardMark,
  BoardSize,
  checkWin,
  getLastMove,
  getPlayer,
  Player,
  TBoard,
} from '@/lib';

interface GameProps {
  /** 보드 크기 */
  size?: BoardSize;
  /** 승리 조건 */
  winCondition?: number;
  /** 첫번째 플레이어 */
  firstPlayer?: Player;
}

export default function Game({ firstPlayer, size = 3, winCondition = 3 }: GameProps) {
  const [board, setBoard] = useState<TBoard>(Array(size * size).fill(null));

  const winner = useRef<BoardMark>(null);
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
      <TurnIndicator player={player} />
      <button disabled={!history.current.length} onClick={onUndoClick}>
        Undo
      </button>
      <h1>{winner.current ? `Winner: ${winner.current}` : `Next Player: ${player}`}</h1>
    </div>
  );
}
