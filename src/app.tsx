import { Layout } from '@/components';
import { GameOptionProvider, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <ScreenProvider>
      <GameOptionProvider>
        <Layout>
          <Screen />
        </Layout>
      </GameOptionProvider>
    </ScreenProvider>
  );
}

export default App;
