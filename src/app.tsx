import { ScreenProvider } from '@/context';
import { Screen } from '@/pages';

function App() {
  return (
    <main className="h-screen w-screen bg-slate-800">
      <ScreenProvider>
        <Screen />
      </ScreenProvider>
    </main>
  );
}

export default App;
