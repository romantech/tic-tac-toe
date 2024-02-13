import { InputHTMLAttributes } from 'react';

import { BasePlayer, BoardSize } from '@/lib/constants';

export type BoardIdx = number;

export type TMark = string | null;
export type Identifier = BasePlayer | null;
export type TSequence = number | null;
export type TSquareColor = string;

export type TSquare = {
  identifier: Identifier;
  sequence: TSequence;
  color: TSquareColor;
  mark: TMark;
};

export type TBoard = TSquare[];

export type Winner = {
  identifier: Identifier;
  indices: Array<BoardIdx> | null;
  mark: TMark;
};

export type GameOption = {
  size: BoardSize;
  winCondition: BoardSize;
  firstPlayer: BasePlayer;
  playerConfigs: PlayerConfigs;
};

export type PlayerConfig = {
  identifier: BasePlayer;
  mark: string;
  color: string;
};

export type PlayerConfigs = {
  [key in BasePlayer]: PlayerConfig;
};

export type ISOString = string;
export type GenericRecord<T = unknown> = Record<string, T>;

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
