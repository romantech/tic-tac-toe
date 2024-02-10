export enum Player {
  /** first player */
  X = 'X',
  /** second player */
  O = 'O',
}

export type BoardMark = Player | null;
export type TBoard = BoardMark[];

export type PlayerInfo = {
  mark: string;
  color: string;
  isFirst: boolean;
  undoCount: number;
};
