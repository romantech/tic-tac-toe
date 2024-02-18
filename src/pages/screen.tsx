import { ComponentType } from 'react';

import { Layout } from '@/components';
import { useScreen } from '@/context';
import { ScreenType } from '@/lib';
import { Game, GameHistory, Home, Settings } from '@/pages';

const screens: { [key in ScreenType]: ComponentType } = {
  [ScreenType.Home]: Home,
  [ScreenType.Settings]: Settings,
  [ScreenType.Play]: Game,
  [ScreenType.History]: GameHistory,
};

export default function Screen() {
  const screen = useScreen();
  const Component = screens[screen];

  return (
    <Layout>
      <Component />
    </Layout>
  );
}
