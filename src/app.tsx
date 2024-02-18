import { AudioProvider, GameOptionProvider, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <ScreenProvider>
      <GameOptionProvider>
        <AudioProvider>
          <Screen />
        </AudioProvider>
      </GameOptionProvider>
    </ScreenProvider>
  );
}

export default App;
