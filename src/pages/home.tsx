import { Button, Fade } from '@/components';
import { useSetScreen } from '@/context';
import { ScreenType } from '@/lib';

export default function Home() {
  const changeScreen = useSetScreen();

  return (
    <Fade className="m-auto flex flex-col items-center justify-center gap-4 md:flex-row">
      <Button className="min-w-72 py-6 text-4xl" onClick={() => changeScreen(ScreenType.Settings)}>
        Start
      </Button>
      <Button className="min-w-72 py-6 text-4xl" onClick={() => changeScreen(ScreenType.History)}>
        History
      </Button>
    </Fade>
  );
}
