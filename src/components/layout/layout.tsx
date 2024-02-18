import { PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import { GitHubSvg, HomeSvg, SpearOffSvg, SpearOnSvg } from '@/assets';
import { Box, BoxProps, Header, IconButton } from '@/components';
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
    <Box className="flex min-h-screen flex-col bg-slate-800 text-slate-200">
      <Header>
        <IconButton onClick={() => changeScreen(ScreenType.Home)}>
          <HomeSvg />
        </IconButton>
        <IconButton onClick={toggleMute}>
          <SoundIcon />
        </IconButton>
        <IconButton onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}>
          <GitHubSvg />
        </IconButton>
      </Header>
      <Box as="main" className={clsx('flex grow p-8', className)}>
        {children}
      </Box>
    </Box>
  );
}
