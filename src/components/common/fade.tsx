import { PropsWithChildren, useLayoutEffect } from 'react';

import { clsx } from 'clsx';

import { Box, type BoxProps } from '@/components';
import { useDisclosure } from '@/hooks';

const durationClasses = {
  75: 'duration-75',
  100: 'duration-100',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
} as const;

interface FadeProps extends BoxProps {
  className?: string;
  duration?: keyof typeof durationClasses;
  trigger?: boolean;
}

export default function Fade({
  children,
  className,
  trigger = true,
  duration = 500,
  ...boxProps
}: PropsWithChildren<FadeProps>) {
  const { isOpen: triggerFade, open: activeFade, close: cancelFade } = useDisclosure(false);

  useLayoutEffect(() => {
    let timer: number;
    if (trigger) {
      activeFade();
      timer = setTimeout(cancelFade, duration);
    }
    return () => clearTimeout(timer);
  }, [activeFade, cancelFade, duration, trigger]);

  return (
    <Box
      className={clsx(className, durationClasses[duration], { 'animate-fadein': triggerFade })}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
