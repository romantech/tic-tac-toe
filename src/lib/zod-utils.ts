import { z } from 'zod';

export const isValidZodLiteralUnion = <T extends z.ZodLiteral<unknown>>(
  literals: T[],
): literals is [T, T, ...T[]] => {
  return literals.length >= 2;
};

/**
 * z.union 으로 배열 매핑시 발생하는 TS2345 타입 오류 해결
 * @see https://github.com/colinhacks/zod/issues/831#issuecomment-1918536468
 * */
export const constructZodLiteralUnionType = <T extends z.ZodLiteral<unknown>>(literals: T[]) => {
  if (!isValidZodLiteralUnion(literals)) {
    throw new Error(
      'Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2',
    );
  }
  return z.union(literals);
};
