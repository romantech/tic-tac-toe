import { useState } from 'react';

import { Game, Home } from '@/components';
import { DefaultColor, Player, PlayersInfo, ScreenType } from '@/lib';

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
  const [screen, setScreen] = useState<ScreenType>(ScreenType.Home);

  const getScreen = (type: ScreenType) => {
    switch (type) {
      case ScreenType.Home: {
        return <Home onClick={setScreen} />;
      }
      case ScreenType.Play: {
        return (
          <Game
            playersInfo={Dummy}
            size={3}
            winCondition={3}
            firstPlayer={Player.X}
            onClick={setScreen}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return <main className="h-screen w-screen bg-slate-800">{getScreen(screen)}</main>;
}

export default App;
