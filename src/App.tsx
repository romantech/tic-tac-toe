import { useState } from 'react';

import { defaultPlayerConfigs, Player, ScreenType } from '@/lib';
import { Game, Home, Settings } from '@/pages';

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
            playerConfigs={defaultPlayerConfigs}
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
