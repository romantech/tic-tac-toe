import { Game } from '@/components';
import { DefaultColor, Player, PlayersInfo } from '@/lib';

const Dummy: PlayersInfo = {
  [Player.X]: {
    defaultMark: Player.X,
    customMark: '□',
    color: DefaultColor.X,
  },
  [Player.O]: {
    defaultMark: Player.O,
    customMark: '△',
    color: DefaultColor.O,
  },
};

function App() {
  return (
    <main className="h-screen w-screen bg-slate-800">
      <Game playersInfo={Dummy} size={3} winCondition={3} firstPlayer={Player.X} />
    </main>
  );
}

export default App;
