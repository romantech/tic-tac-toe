import { Broom } from '@/assets';
import { BoardList, Button, Divider, Empty, Fade, OrderToggle } from '@/components';
import { useDisclosure, useGameHistory } from '@/hooks';

export default function GameHistory() {
  const { historyList, clearHistory } = useGameHistory();
  const { toggle: toggleShowOrder, isOpen: showOrder } = useDisclosure(true);
  const isHistoryEmpty = historyList.length === 0;

  return (
    <Fade className="m-auto grid size-full max-w-screen-xl grid-cols-[repeat(auto-fill,_minmax(288px,320px))] place-content-center gap-8">
      <div className="col-span-full flex gap-3">
        <Button className="border-none text-2xl" onClick={clearHistory} disabled={isHistoryEmpty}>
          <Broom />
        </Button>
        <OrderToggle disabled={isHistoryEmpty} checked={showOrder} onChange={toggleShowOrder} />
      </div>
      <Divider className="col-span-full w-full" direction="horizontal" />
      <BoardList boardList={historyList} hideSequence={!showOrder} />
      <Empty className="uppercase" hidden={!isHistoryEmpty}>
        no history
      </Empty>
    </Fade>
  );
}
