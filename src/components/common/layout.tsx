import { PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import { GitHubSvg, HomeSvg, SpearOffSvg, SpearOnSvg } from '@/assets';
import { Box, BoxProps, IconButton } from '@/components';
import { useAudio, useSetScreen } from '@/context';
import { ScreenType } from '@/lib';

const githubUrl = 'https://github.com/romantech/tic-tac-toe';

interface LayoutProps extends BoxProps {
  className?: string;
}

export default function Layout({ children, className }: PropsWithChildren<LayoutProps>) {
  const changeScreen = useSetScreen();
  const { isMuted, toggleMute } = useAudio();
  const SoundIcon = isMuted ? SpearOffSvg : SpearOnSvg;

  return (
    <Box className={clsx('flex min-h-screen flex-col bg-slate-800 text-slate-200', className)}>
      <header
        className={clsx(
          'sticky top-0 z-10 flex min-h-16 items-center justify-center gap-3 bg-slate-700/10 px-4 shadow backdrop-blur',
          className,
        )}
      >
        <IconButton onClick={() => changeScreen(ScreenType.Home)}>
          <HomeSvg />
        </IconButton>
        <IconButton onClick={toggleMute}>
          <SoundIcon />
        </IconButton>
        <IconButton onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}>
          <GitHubSvg />
        </IconButton>
      </header>
      <Box as="main" className="flex grow p-8">
        {children}
      </Box>
    </Box>
  );
}
