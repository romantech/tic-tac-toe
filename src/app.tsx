import { Layout } from '@/components';
import { AudioProvider, GameOptionProvider, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <ScreenProvider>
      <GameOptionProvider>
        <AudioProvider>
          <Layout>
            <Screen />
          </Layout>
        </AudioProvider>
      </GameOptionProvider>
    </ScreenProvider>
  );
}

export default App;
