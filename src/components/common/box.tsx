import { ElementType } from 'react';

export type BoxProps<C extends ElementType = ElementType> = {
  as?: C;
  [key: string]: unknown;
};

export const Box = ({ as = 'div', ...props }: BoxProps) => {
  const Component = as;
  return <Component {...props} />;
};
