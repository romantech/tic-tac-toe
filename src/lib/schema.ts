import { z } from 'zod';

import { BoardSize, defaultPlayerConfigs, Player } from '@/lib/constants';

const PlayerConfigSchema = z.object({
  identifier: z.nativeEnum(Player).readonly(),
  mark: z.string().min(1).max(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/), // HEX,
});

export const gameOptionSchema = z
  .object({
    size: z.nativeEnum(BoardSize).default(BoardSize.Size3),
    winCondition: z.nativeEnum(BoardSize).default(BoardSize.Size3),
    firstPlayer: z.nativeEnum(Player).default(Player.X),
    playerConfigs: z.record(PlayerConfigSchema).default(defaultPlayerConfigs),
  })
  .refine((data) => data.winCondition <= data.size, {
    message: 'Win condition must be less than or equal to the board size.',
  });
