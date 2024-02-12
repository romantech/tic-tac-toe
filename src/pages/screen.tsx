import { ComponentType } from 'react';

import { useScreen } from '@/context';
import { ScreenType } from '@/lib';
import { Game, Home, Settings } from '@/pages';

const screens: { [key in ScreenType]: ComponentType } = {
  [ScreenType.Home]: Home,
  [ScreenType.Settings]: Settings,
  [ScreenType.Play]: Game,
  [ScreenType.History]: Settings,
};

export default function Screen() {
  const screen = useScreen();
  const Component = screens[screen];

  return <Component />;
}
