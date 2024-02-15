import { Fragment } from 'react';

import { Board, BoardInfo } from '@/components';
import { BoardType, getBoardConfig, TGameHistory } from '@/lib';

interface BoardListProps {
  boardList: TGameHistory[];
  hideSequence?: boolean;
}

export default function BoardList({ boardList, hideSequence = false }: BoardListProps) {
  return (
    <Fragment>
      {boardList?.map(({ board, winner, createdAt, size }) => (
        <section key={createdAt}>
          <BoardInfo winner={winner.mark} createdAt={createdAt} />
          <Board
            board={board}
            winner={winner}
            className={getBoardConfig(size, BoardType.View)}
            type={BoardType.View}
            hideSequence={hideSequence}
          />
        </section>
      ))}
    </Fragment>
  );
}
