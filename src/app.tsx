import { AudioProvider, GameOptionProvider, ProviderCombiner, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

const providers = [ScreenProvider, GameOptionProvider, AudioProvider];

function App() {
  return (
    <ProviderCombiner providers={providers}>
      <Screen />
    </ProviderCombiner>
  );
}

export default App;
