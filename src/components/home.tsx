import { Button } from '@/components/index';
import { ScreenType } from '@/lib';

export default function Home({ onClick }: { onClick: (type: ScreenType) => void }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 text-slate-200 md:flex-row">
      <Button className="min-w-72 py-6 text-4xl" onClick={() => onClick(ScreenType.Play)}>
        Start Game
      </Button>
      <Button className="min-w-72 py-6 text-4xl" onClick={() => onClick(ScreenType.History)}>
        Game History
      </Button>
    </div>
  );
}
