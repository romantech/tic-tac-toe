export enum Player {
  /** first player */
  X = 'X',
  /** second player */
  O = 'O',
}

export type TBoard = (Player | null)[];
