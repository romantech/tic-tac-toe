import { clsx } from 'clsx';

import { Board } from '@/components';
import { useGameHistory } from '@/hooks/use-game-history';
import { BasePlayer, BoardType } from '@/lib';

export default function GameHistory() {
  const { gameHistory } = useGameHistory();

  return (
    <div className="flex size-full flex-wrap items-center justify-center gap-8 overflow-auto p-8">
      {gameHistory.map(({ board, winner, createdAt, boardConfigs }) => (
        <div key={createdAt} className="size-full max-h-80 max-w-80 text-2xl">
          <div className="flex gap-2 bg-slate-600 p-1 text-base text-slate-200">
            <div className="flex gap-2 uppercase">
              <span>Winner</span>
              <span
                className={clsx('uppercase', {
                  'text-blue-500': winner.identifier === BasePlayer.O,
                })}
              >
                {winner.identifier ?? 'tie'}
              </span>
            </div>
            <div>{new Date(createdAt).toLocaleString()}</div>
          </div>
          <Board
            board={board}
            winner={winner}
            className={clsx(boardConfigs)}
            type={BoardType.View}
          />
        </div>
      ))}
    </div>
  );
}
