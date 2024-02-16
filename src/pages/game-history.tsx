import { BoardList, Button, Divider, Empty, Fade, OrderToggle } from '@/components';
import { useDisclosure, useGameHistory } from '@/hooks';

export default function GameHistory() {
  const { historyList, clearHistory } = useGameHistory();
  const { toggle: toggleShowOrder, isOpen: showOrder } = useDisclosure(true);

  return (
    <Fade className="text- m-auto grid size-full max-w-screen-xl grid-cols-[repeat(auto-fill,_minmax(288px,320px))] place-content-center gap-8">
      <div className="col-span-full flex gap-3">
        <Button className="px-3 capitalize" onClick={clearHistory}>
          clear
        </Button>
        <OrderToggle checked={showOrder} onChange={toggleShowOrder} />
      </div>
      <Divider className="col-span-full w-full" direction="horizontal" />
      <BoardList boardList={historyList} hideSequence={!showOrder} />
      <Empty hidden={historyList.length !== 0}>no history</Empty>
    </Fade>
  );
}
