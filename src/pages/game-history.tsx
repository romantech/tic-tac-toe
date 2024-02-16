import { BoardList, Button, Divider, Empty, Fade, OrderToggle } from '@/components';
import { useSetScreen } from '@/context';
import { useDisclosure, useGameHistory } from '@/hooks';
import { ScreenType } from '@/lib';

export default function GameHistory() {
  const { historyList, clearHistory } = useGameHistory();
  const { toggle: toggleShowOrder, isOpen: showOrder } = useDisclosure(true);
  const setScreen = useSetScreen();

  return (
    <Fade className="m-auto grid size-full max-w-screen-xl grid-cols-[repeat(auto-fill,_minmax(288px,320px))] place-content-center gap-8 py-8 text-slate-200">
      <div className="col-span-full flex gap-3">
        <Button className="w-full max-w-24 capitalize" onClick={() => setScreen(ScreenType.Home)}>
          home
        </Button>
        <Button className="w-full max-w-24 capitalize" onClick={clearHistory}>
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
