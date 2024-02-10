import { BoardSize, DefaultColors, Player } from '@/lib/constants';

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type PlayerInfo = {
  defaultMark: Player;
  customMark: string | Player;
  color: string | DefaultColors;
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
