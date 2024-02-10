import { useState } from 'react';

import { Game, Home, Settings } from '@/components';
import { defaultPlayersInfo, Player, ScreenType } from '@/lib';

function App() {
  const [screen, setScreen] = useState<ScreenType>(ScreenType.Home);

  const getScreen = (type: ScreenType) => {
    switch (type) {
      case ScreenType.Home: {
        return <Home onClick={setScreen} />;
      }
      case ScreenType.Settings: {
        return <Settings />;
      }
      case ScreenType.Play: {
        return (
          <Game
            playersInfo={defaultPlayersInfo}
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
