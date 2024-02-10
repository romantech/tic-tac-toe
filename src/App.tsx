import { Game } from '@/components';
import { DefaultColors, Player, PlayersInfo } from '@/lib';

const Dummy: PlayersInfo = {
  [Player.X]: {
    defaultMark: Player.X,
    customMark: '□',
    color: DefaultColors.X,
  },
  [Player.O]: {
    defaultMark: Player.O,
    customMark: '△',
    color: DefaultColors.O,
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
