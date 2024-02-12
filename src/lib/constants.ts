import { clsx } from 'clsx';

import { BoardType, GameOption, PlayerConfigs } from '@/lib/types';

export const NBSP = '\u00A0';
export const MAX_UNDO_COUNT = 3;

export enum BoardSize {
  Size3 = 3,
  Size4 = 4,
  Size5 = 5,
  Size6 = 6,
  Size7 = 7,
}

export type BoardConfig = ReturnType<typeof getBoardConfig>;
export const getBoardConfig = (size: BoardSize, type: BoardType = 'play') => {
  const isPlay = type === 'play';

  const configs = {
    [BoardSize.Size3]: clsx('grid-cols-3', isPlay && 'text-7xl lg:text-8xl'),
    [BoardSize.Size4]: clsx('grid-cols-4', isPlay && 'text-6xl lg:text-7xl'),
    [BoardSize.Size5]: clsx('grid-cols-5', isPlay && 'text-5xl lg:text-6xl'),
    [BoardSize.Size6]: clsx('grid-cols-6', isPlay && 'text-4xl lg:text-5xl'),
    [BoardSize.Size7]: clsx('grid-cols-7', isPlay && 'text-3xl lg:text-4xl'),
  } as const;

  return configs[size];
};

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
