import { useCallback, useState } from 'react';

import constate from 'constate';

import { defaultGameOption, GameOption } from '@/lib';

interface GameOptionProviderProps {
  defaultOption?: GameOption;
}

const [GameOptionProvider, useGameOption, useSetGameOption] = constate(
  ({ defaultOption = defaultGameOption }: GameOptionProviderProps) => {
    const [gameOption, setGameOption] = useState(defaultOption);

    const changeGameOption = useCallback((option: Partial<GameOption>) => {
      setGameOption((prev) => ({ ...prev, ...option }));
    }, []);

    return { gameOption, changeGameOption };
  },
  ({ gameOption }) => gameOption,
  ({ changeGameOption }) => changeGameOption,
);

export { GameOptionProvider, useGameOption, useSetGameOption };
