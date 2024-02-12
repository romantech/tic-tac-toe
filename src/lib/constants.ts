import { GameOption, PlayerConfigs } from '@/lib/types';

export const NBSP = '\u00A0';
export const MAX_UNDO_COUNT = 3;

export enum BoardSize {
  Size3 = 3,
  Size4 = 4,
  Size5 = 5,
  Size6 = 6,
  Size7 = 7,
}

export const boardConfig = {
  [BoardSize.Size3]: 'grid-cols-3 text-7xl lg:text-8xl',
  [BoardSize.Size4]: 'grid-cols-4 text-6xl lg:text-7xl',
  [BoardSize.Size5]: 'grid-cols-5 text-5xl lg:text-6xl',
  [BoardSize.Size6]: 'grid-cols-6 text-4xl lg:text-5xl',
  [BoardSize.Size7]: 'grid-cols-7 text-3xl lg:text-4xl',
} as const;

export const boardSize = Object.values(BoardSize).filter(Number);

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

export const defaultPlayerConfigs: PlayerConfigs = {
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

export const defaultGameOption: GameOption = {
  size: BoardSize.Size3,
  winCondition: BoardSize.Size3,
  firstPlayer: Player.X,
  playerConfigs: defaultPlayerConfigs,
};
