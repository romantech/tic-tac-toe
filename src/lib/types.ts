import { BoardSize } from '@/lib/constants';

export enum Player {
  /** first player */
  X = 'X',
  /** second player */
  O = 'O',
}

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type PlayerInfo = {
  mark: Player;
  customMark: string | null;
  color: string | null;
};

export type GameOption = {
  size: BoardSize;
  winCondition: number;
  firstPlayer: Player;
};

export type Players = {
  [key in Player]: PlayerInfo;
};
