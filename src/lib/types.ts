import { InputHTMLAttributes } from 'react';

import { BoardConfig, BoardSize, Player } from '@/lib/constants';

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type Winner = {
  player: Player | null;
  indices: Array<number> | null;
};

export type GameOption = {
  size: BoardSize;
  winCondition: BoardSize;
  firstPlayer: Player;
  playerConfigs: PlayerConfigs;
};

export type PlayerConfig = {
  identifier: Player;
  mark: string;
  color: string;
};

export type PlayerConfigs = {
  [key in Player]: PlayerConfig;
};

export type GameHistory = {
  board: TBoard;
  winner: Winner;
  playerConfigs: PlayerConfigs;
  boardConfigs: BoardConfig;
  createdAt: ISODateString;
};

export type BoardType = 'play' | 'view';

export type ISODateString = string;

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
