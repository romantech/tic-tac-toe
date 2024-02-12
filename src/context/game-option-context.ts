import { useState } from 'react';

import constate from 'constate';

import { defaultGameOption, GameOption } from '@/lib';

const [GameOptionProvider, useGameOption, useSetGameOption] = constate(
  () => {
    const [gameOption, setGameOption] = useState<GameOption>(defaultGameOption);
    return { gameOption, setGameOption };
  },
  ({ gameOption }) => gameOption,
  ({ setGameOption }) => setGameOption,
);

export { GameOptionProvider, useGameOption, useSetGameOption };
