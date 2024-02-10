import { z } from 'zod';

import { BoardSize, defaultPlayersInfo, Player } from '@/lib/constants';

const PlayerInfoSchema = z.object({
  identifier: z.nativeEnum(Player).readonly(),
  mark: z.string().min(1).max(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/), // HEX,
});

export const PlayersInfoSchema = z.record(PlayerInfoSchema).default(defaultPlayersInfo);

export const gameSettingSchema = z
  .object({
    size: z.nativeEnum(BoardSize).default(BoardSize.Three),
    winCondition: z.number().int().min(3).max(7).default(3),
    firstPlayer: z.nativeEnum(Player).default(Player.X),
    playersInfo: PlayersInfoSchema,
  })
  .refine((data) => data.winCondition <= data.size, {
    message: 'Win condition must be less than or equal to the board size.',
  });
