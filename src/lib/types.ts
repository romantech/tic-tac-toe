import { BoardSize, DefaultColor, Player } from '@/lib/constants';

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type PlayerInfo = {
  defaultMark: Player;
  customMark: string | Player;
  color: string | DefaultColor;
};

export type Winner = {
  player: Player | null;
  indices: Set<number> | null;
};

export type PlayersInfo = {
  [key in Player]: PlayerInfo;
};

export type GameOption = {
  size: BoardSize;
  winCondition: number;
  firstPlayer: Player;
  playersInfo: PlayersInfo;
};

export enum ScreenType {
  'Home',
  'Play',
  'History',
  'Settings',
}
