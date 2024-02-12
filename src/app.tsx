import { GameOptionProvider, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <main className="min-h-screen bg-slate-800">
      <ScreenProvider>
        <GameOptionProvider>
          <Screen />
        </GameOptionProvider>
      </ScreenProvider>
    </main>
  );
}

export default App;
