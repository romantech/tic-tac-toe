import { useCallback, useState } from 'react';

import constate from 'constate';

import { ScreenType } from '@/lib';

interface ScreenProviderProps {
  defaultScreen?: ScreenType;
}

const [ScreenProvider, useScreen, useSetScreen] = constate(
  ({ defaultScreen = ScreenType.Home }: ScreenProviderProps) => {
    const [screen, setScreen] = useState<ScreenType>(defaultScreen);

    const changeScreen = useCallback((screen: ScreenType) => {
      setScreen(screen);
    }, []);

    return { screen, changeScreen };
  },
  ({ screen }) => screen,
  ({ changeScreen }) => changeScreen,
);

export { ScreenProvider, useScreen, useSetScreen };
