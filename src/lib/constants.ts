import { PlayersInfo } from '@/lib/types';

export const NBSP = '\u00A0';
export const MAX_UNDO_COUNT = 3;

export enum BoardSize {
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
}

export const boardConfigs = {
  [BoardSize.Three]: 'grid-cols-3 text-7xl lg:text-8xl',
  [BoardSize.Four]: 'grid-cols-4 text-6xl lg:text-7xl',
  [BoardSize.Five]: 'grid-cols-5 text-5xl lg:text-6xl',
  [BoardSize.Six]: 'grid-cols-6 text-4xl lg:text-5xl',
  [BoardSize.Seven]: 'grid-cols-7 text-3xl lg:text-4xl',
} as const;

export enum Player {
  /** first player */
  X = 'X',
  /** second player */
  O = 'O',
}

export enum DefaultColor {
  X = '#FED766',
  O = '#9CFFD9',
}

export enum ScreenType {
  'Home',
  'Play',
  'History',
  'Settings',
}

export const defaultPlayersInfo: PlayersInfo = {
  [Player.X]: {
    identifier: Player.X,
    mark: Player.X,
    color: DefaultColor.X,
  },
  [Player.O]: {
    identifier: Player.O,
    mark: Player.O,
    color: DefaultColor.O,
  },
};
