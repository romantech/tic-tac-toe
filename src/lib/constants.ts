import { GameOption, PlayerConfigs, Winner } from '@/lib/types';

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

export const defaultWinner: Winner = { identifier: null, indices: null, mark: null };

export enum Score {
  Win = 100,
  Lose = -100,
  Draw = 0,
}
