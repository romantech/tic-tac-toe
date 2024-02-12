import { clsx } from 'clsx';

import { Board } from '@/components';
import { useGameHistory } from '@/hooks/use-game-history';

export default function GameHistory() {
  const { gameHistory } = useGameHistory();

  return (
    <div className="flex size-full flex-wrap items-center justify-center gap-8 overflow-auto p-8">
      {gameHistory.map(({ board, winner, createdAt, boardConfigs }) => (
        <Board
          key={createdAt}
          board={board}
          winner={winner}
          className={clsx(boardConfigs, 'size-full max-h-80 max-w-80 text-2xl')}
          type="view"
        />
      ))}
    </div>
  );
}
