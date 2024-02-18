import { FC, PropsWithChildren } from 'react';

interface AppProviderProps {
  /**
   * 배열 뒷쪽에 위치할 수록 바깥 레이어에서 children 랩핑
   * @example
   * [A, B, C] => <C><B><A>{children}</A></B></C>
   * */
  providers: FC<PropsWithChildren>[];
}

export const ProviderCombiner = ({ children, providers }: PropsWithChildren<AppProviderProps>) => {
  return providers.reduceRight((wrappedChildren, Provider) => {
    return <Provider>{wrappedChildren}</Provider>;
  }, children);
};
