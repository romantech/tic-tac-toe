export type BoardSize = 3 | 4 | 5 | 6 | 7;
type BoardConfig = { [key in BoardSize]: string };

export const boardConfigs = {
  3: 'grid-cols-3 text-7xl lg:text-8xl',
  4: 'grid-cols-4 text-6xl lg:text-7xl',
  5: 'grid-cols-5 text-5xl lg:text-6xl',
  6: 'grid-cols-6 text-4xl lg:text-5xl',
  7: 'grid-cols-7 text-3xl lg:text-4xl',
} satisfies BoardConfig;
