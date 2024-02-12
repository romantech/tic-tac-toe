import { clsx } from 'clsx';

import { Board } from '@/components';
import { useGameHistory } from '@/hooks/use-game-history';

export default function GameHistory() {
  const { gameHistory } = useGameHistory();

  return (
    <div className="flex size-full flex-wrap items-center justify-center gap-8">
      {gameHistory.map(({ board, winner, playerConfigs, createdAt, boardConfigs }) => (
        <Board
          key={createdAt}
          board={board}
          winner={winner}
          playerConfigs={playerConfigs}
          className={clsx(boardConfigs, 'size-full max-h-64 max-w-64 text-2xl')}
          type="view"
        />
      ))}
    </div>
  );
}
