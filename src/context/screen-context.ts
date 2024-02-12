import { useState } from 'react';

import constate from 'constate';

import { ScreenType } from '@/lib';

const [ScreenProvider, useScreen, useSetScreen] = constate(
  () => {
    const [screen, setScreen] = useState<ScreenType>(ScreenType.Home);
    return { screen, setScreen };
  },
  ({ screen }) => screen,
  ({ setScreen }) => setScreen,
);

export { ScreenProvider, useScreen, useSetScreen };
