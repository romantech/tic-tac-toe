import { clsx } from 'clsx';

import { GameOption, PlayerConfigs, TSquare, Winner } from '@/lib/types';

export const NBSP = '\u00A0';
export const MAX_UNDO_COUNT = 3;
export const TIE_SYMBOL = '−';

export enum GameHistory {
  Key = 'tic-tac-toe-history',
  Max = 20,
}

export enum BoardSize {
  Size3 = 3,
  Size4 = 4,
  Size5 = 5,
  Size6 = 6,
  Size7 = 7,
}

export type BoardConfig = ReturnType<typeof getBoardConfig>;
export const getBoardConfig = (size: BoardSize, type: BoardType = BoardType.Play) => {
  const isPlay = type === BoardType.Play;

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

export enum BasePlayer {
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
  Home,
  Play,
  History,
  Settings,
}

export enum BoardType {
  Play,
  View,
}

export enum GameMode {
  SinglePlayer = 'SINGLE_PLAYER',
  TwoPlayers = 'TWO_PLAYERS',
}

export const defaultPlayerConfigs: PlayerConfigs = {
  [BasePlayer.X]: {
    identifier: BasePlayer.X,
    mark: BasePlayer.X,
    color: DefaultColor.X,
  },
  [BasePlayer.O]: {
    identifier: BasePlayer.O,
    mark: BasePlayer.O,
    color: DefaultColor.O,
  },
};

export const defaultGameOption: GameOption = {
  size: BoardSize.Size3,
  winCondition: BoardSize.Size3,
  firstPlayer: BasePlayer.X,
  playerConfigs: defaultPlayerConfigs,
  gameMode: GameMode.SinglePlayer,
};

export const defaultSquare: TSquare = {
  identifier: null,
  sequence: null,
  color: 'transparent',
  mark: null,
};
export const defaultWinner: Winner = { identifier: null, indices: null, mark: null };
