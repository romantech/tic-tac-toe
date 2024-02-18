import { Button, Fade } from '@/components';
import { useSetScreen } from '@/context';
import { ScreenType } from '@/lib';

export default function Home() {
  const changeScreen = useSetScreen();

  return (
    <Fade className="m-auto flex flex-col items-center justify-center gap-4 text-4xl md:flex-row">
      <Button className="h-24 min-w-72 uppercase" onClick={() => changeScreen(ScreenType.Settings)}>
        <span className="font-extrabold">start</span>
      </Button>
      <Button
        className="h-24 min-w-72 uppercase"
        variant="outline"
        onClick={() => changeScreen(ScreenType.History)}
      >
        <span className="font-extrabold">history</span>
      </Button>
    </Fade>
  );
}
