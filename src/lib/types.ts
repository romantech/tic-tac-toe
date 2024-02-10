import { BoardSize, Player } from '@/lib/constants';

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type Winner = {
  player: Player | null;
  indices: Set<number> | null;
};

export type GameOption = {
  size: BoardSize;
  winCondition: number;
  firstPlayer: Player;
  playersInfo: PlayersInfo;
};

export type PlayerInfo = {
  identifier: Player;
  mark: string;
  color: string;
};

export type PlayersInfo = {
  [key in Player]: PlayerInfo;
};
