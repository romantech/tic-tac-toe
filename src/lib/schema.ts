import { z } from 'zod';

import { BasePlayer, BoardSize, defaultPlayerConfigs, GameMode } from '@/lib/constants';
import { isUniqueProperty } from '@/lib/helpers';

const PlayerConfigSchema = z.object({
  identifier: z.nativeEnum(BasePlayer).readonly(),
  // \p{} : 유니코드 속성 이스케이프 문법
  // Letter : 모든 언어의 글자를 일치시키는 유니코드 속성 (L로 적을 수도 있음)
  // u 플래그 : 유니코드 모드 활성
  mark: z
    .string()
    .min(1, 'Mark is required')
    .regex(/^[\p{L}\p{N}\p{S}\p{Po}]$/u, 'Only letters, numbers, or symbols are allowed'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/), // HEX,
});

export const gameOptionSchema = z
  .object({
    size: z.nativeEnum(BoardSize).default(BoardSize.Size3),
    winCondition: z.nativeEnum(BoardSize).default(BoardSize.Size3),
    firstPlayer: z.nativeEnum(BasePlayer).default(BasePlayer.X),
    playerConfigs: z.record(PlayerConfigSchema).default(defaultPlayerConfigs),
    gameMode: z.nativeEnum(GameMode).default(GameMode.SinglePlayer),
  })
  .refine((data) => data.winCondition <= data.size, {
    message: 'Win condition cannot exceed board size',
  })
  .refine((data) => isUniqueProperty(Object.values(data.playerConfigs), 'mark'), {
    message: 'Each player must have a unique mark',
    path: ['playerConfigs.X.mark'],
  })
  .refine((data) => isUniqueProperty(Object.values(data.playerConfigs), 'color'), {
    message: 'Each player must have a unique color',
    path: ['playerConfigs.X.color'],
  });
