import { BasePlayer, BoardSize, GameMode } from '@/lib/constants';

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
  gameMode: GameMode;
};

export type PlayerConfig = {
  identifier: BasePlayer;
  mark: string;
  color: string;
};

export type PlayerConfigs = {
  [key in BasePlayer]: PlayerConfig;
};

export type ISODateString = string;
export type GenericRecord<T = unknown> = Record<string, T>;

export type DeltaRowCol = { deltaRow: number; deltaCol: number };
export type LastRowCol = { lastRow: number; lastCol: number };
