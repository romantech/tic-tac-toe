import { InputHTMLAttributes } from 'react';

import { BoardSize, Player } from '@/lib/constants';

export type Mark = Player | null;
export type TSequence = number | null;
export type TSquare = { mark: Mark; sequence: TSequence; color: string };
export type TBoard = TSquare[];

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

export type BoardType = 'play' | 'view';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
