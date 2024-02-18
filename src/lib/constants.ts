import { GameOption, PlayerConfigs, TSquare, Winner } from '@/lib/types';

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
}

export const boardSize = Object.values(BoardSize).filter(Number);

export enum BasePlayer {
  /** First player */
  X = 'X',
  /** Second player which is bot on single play */
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

export const getBoardConfig = (size: BoardSize, type: BoardType = BoardType.Play) => {
  const boardConfig = {
    [BoardSize.Size3]: {
      [BoardType.Play]: 'grid-cols-3 text-7xl sm:text-8xl',
      [BoardType.View]: 'grid-cols-3 text-6xl',
    },
    [BoardSize.Size4]: {
      [BoardType.Play]: 'grid-cols-4 text-6xl sm:text-7xl',
      [BoardType.View]: 'grid-cols-4 text-5xl',
    },
    [BoardSize.Size5]: {
      [BoardType.Play]: 'grid-cols-5 text-5xl sm:text-6xl',
      [BoardType.View]: 'grid-cols-5 text-4xl',
    },
    [BoardSize.Size6]: {
      [BoardType.Play]: 'grid-cols-6 text-4xl sm:text-5xl',
      [BoardType.View]: 'grid-cols-6 text-3xl',
    },
  };

  return boardConfig[size][type];
};

export const getSequenceTextClasses = (size: BoardSize) => {
  switch (size) {
    case BoardSize.Size3:
      return 'text-lg top-0.5 right-1.5';
    case BoardSize.Size4:
      return 'text-base top-0 right-1';
    case BoardSize.Size5:
      return 'text-sm top-0 right-0.5';
    case BoardSize.Size6:
      return 'text-xs top-0 right-0.5';
    default:
      console.error('Invalid size');
      return 'text-base';
  }
};

export const getPlayModeSquareClasses = (totalSquares: number, index: number) => {
  const size = Math.sqrt(totalSquares);
  const rightBorder = size > 4 ? 'border-r-[3px]' : 'border-r-4';
  const bottomBorder = size > 4 ? 'border-b-[3px]' : 'border-b-4';

  const classes: string[] = ['border-slate-200'];

  const isLastSquareInRow = (index + 1) % size === 0;
  if (!isLastSquareInRow) classes.push(rightBorder);

  const isLastRowSquare = index >= totalSquares - size;
  if (!isLastRowSquare) classes.push(bottomBorder);

  return classes.join(' ');
};
