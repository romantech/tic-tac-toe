import { useCallback, useState } from 'react';

import constate from 'constate';

import { defaultGameOption, GameMode, GameOption } from '@/lib';

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
  ({ gameOption }) => {
    const { gameMode, ...options } = gameOption;
    return { ...options, isSinglePlay: gameMode === GameMode.SinglePlayer };
  },
  ({ changeGameOption }) => changeGameOption,
);

export { GameOptionProvider, useGameOption, useSetGameOption };
