import { clsx } from 'clsx';

import { Board, BoardInfo, Button, Divider } from '@/components';
import Empty from '@/components/empty';
import { useSetScreen } from '@/context';
import { useGameHistory } from '@/hooks';
import { BoardType, ScreenType } from '@/lib';

export default function GameHistory() {
  const { gameHistory } = useGameHistory();

  return (
    <div className="mx-auto grid min-h-screen max-w-screen-xl grid-cols-[repeat(auto-fill,_minmax(288px,288px))] place-content-center gap-8 p-8 text-slate-200">
      <GameHistoryButtonGroup />
      <Divider className="col-span-full w-full" direction="horizontal" />
      {gameHistory.map(({ board, winner, createdAt, boardConfigs }) => (
        <section key={createdAt}>
          <BoardInfo winner={winner.mark} createdAt={createdAt} />
          <Board
            board={board}
            winner={winner}
            className={clsx(boardConfigs, 'text-2xl')}
            type={BoardType.View}
          />
        </section>
      ))}
      <Empty hidden={gameHistory.length !== 0}>no history</Empty>
    </div>
  );
}

const GameHistoryButtonGroup = ({ className }: { className?: string }) => {
  const setScreen = useSetScreen();

  return (
    <div className={clsx('col-span-full flex gap-3', className)}>
      <Button className="w-full max-w-24" onClick={() => setScreen(ScreenType.Home)}>
        Home
      </Button>
      <Button className="w-full max-w-24" onClick={() => setScreen(ScreenType.Settings)}>
        Start
      </Button>
    </div>
  );
};
