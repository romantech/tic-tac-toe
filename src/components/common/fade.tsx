import { PropsWithChildren, useLayoutEffect, useState } from 'react';

import { clsx } from 'clsx';

import { Box, type BoxProps } from '@/components';

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
  const [isFadingIn, setIsFadingIn] = useState(false);

  useLayoutEffect(() => {
    let timer: number;
    if (trigger) {
      setIsFadingIn(true);
      timer = setTimeout(() => setIsFadingIn(false), duration);
    }
    return () => clearTimeout(timer);
  }, [duration, trigger]);

  return (
    <Box
      {...boxProps}
      className={clsx(className, isFadingIn && `animate-fade ${durationClasses[duration]}`)}
    >
      {children}
    </Box>
  );
}
