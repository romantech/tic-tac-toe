export const NBSP = '\u00A0';

export const boardConfigs = {
  3: 'grid-cols-3 text-7xl lg:text-8xl',
  4: 'grid-cols-4 text-6xl lg:text-7xl',
  5: 'grid-cols-5 text-5xl lg:text-6xl',
  6: 'grid-cols-6 text-4xl lg:text-5xl',
  7: 'grid-cols-7 text-3xl lg:text-4xl',
} as const;
export type BoardConfig = typeof boardConfigs;
export type BoardSize = keyof BoardConfig;

export enum Player {
  /** first player */
  X = 'X',
  /** second player */
  O = 'O',
}

export enum DefaultColors {
  X = '#FED766',
  O = '#9CFFD9',
}
