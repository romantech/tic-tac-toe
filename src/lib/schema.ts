import { z } from 'zod';

import { BoardSize, defaultPlayerConfigs, Player } from '@/lib/constants';

const PlayerConfigSchema = z.object({
  identifier: z.nativeEnum(Player).readonly(),
  // \p{} : 유니코드 속성 이스케이프 문법
  // Letter : 모든 언어의 글자를 일치시키는 유니코드 속성 (L로 적을 수도 있음)
  // u 플래그 : 유니코드 모드 활성
  mark: z
    .string()
    .min(1, 'Mark is required')
    .regex(/^[\p{L}\p{N}\p{S}]$/u, 'Only letters, numbers, or symbols are allowed'),
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
    message: 'Win condition cannot exceed board size',
  })
  .refine(
    (data) => {
      const marks = Object.values(data.playerConfigs).map(({ mark }) => mark);
      return new Set(marks).size === marks.length; // X, O 마크 중복 검사
    },
    {
      message: 'Each player must have a unique mark',
      path: ['playerConfigs.X.mark'],
    },
  );
