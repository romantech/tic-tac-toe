import { ComponentProps } from 'react';

import { DevTool } from '@hookform/devtools';
import { FieldValues } from 'react-hook-form';

import { isDev } from '@/lib';

type DevToolWrapperProps<T extends FieldValues> = ComponentProps<typeof DevTool<T>>;

export default function DevToolWrapper<T extends FieldValues>({
  ...devToolProps
}: DevToolWrapperProps<T>) {
  if (!isDev()) return null;
  return <DevTool {...devToolProps} />;
}
