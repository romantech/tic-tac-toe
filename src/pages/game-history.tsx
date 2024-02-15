import { Fragment } from 'react';

import { Board, BoardInfo, Button, Divider, Empty, Fade } from '@/components';
import { useSetScreen } from '@/context';
import { useGameHistory } from '@/hooks';
import { BoardType, getBoardConfig, ScreenType, TGameHistory } from '@/lib';

export default function GameHistory() {
  const { historyList, clearHistory } = useGameHistory();
  const setScreen = useSetScreen();

  return (
    <Fade className="mx-auto grid min-h-screen max-w-screen-xl grid-cols-[repeat(auto-fill,_minmax(288px,320px))]     place-content-center gap-8 p-8 text-slate-200">
      <div className="col-span-full flex gap-3">
        <Button className="w-full max-w-24 capitalize" onClick={() => setScreen(ScreenType.Home)}>
          home
        </Button>
        <Button className="w-full max-w-24 capitalize" onClick={clearHistory}>
          clear
        </Button>
      </div>
      <Divider className="col-span-full w-full" direction="horizontal" />
      <HistoryList historyList={historyList} />
      <Empty hidden={historyList.length !== 0}>no history</Empty>
    </Fade>
  );
}

const HistoryList = ({ historyList }: { historyList: TGameHistory[] }) => {
  return (
    <Fragment>
      {historyList?.map(({ board, winner, createdAt, size }) => (
        <section key={createdAt}>
          <BoardInfo winner={winner.mark} createdAt={createdAt} />
          <Board
            board={board}
            winner={winner}
            className={getBoardConfig(size, BoardType.View)}
            type={BoardType.View}
          />
        </section>
      ))}
    </Fragment>
  );
};
