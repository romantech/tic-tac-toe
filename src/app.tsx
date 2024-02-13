import { GithubButton } from '@/components';
import { GameOptionProvider, ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <main className="min-h-screen bg-slate-800">
      <GithubButton
        url="https://github.com/romantech/tic-tac-toe"
        className="absolute right-4 top-4"
      />
      <ScreenProvider>
        <GameOptionProvider>
          <Screen />
        </GameOptionProvider>
      </ScreenProvider>
    </main>
  );
}

export default App;
