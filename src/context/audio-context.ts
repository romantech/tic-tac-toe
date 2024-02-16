import constate from 'constate';

import { useDisclosure } from '@/hooks';

const [AudioProvider, useAudio, useIsMuted] = constate(
  () => {
    const { isOpen: isMuted, toggle: toggleMute } = useDisclosure();
    return { isMuted, toggleMute };
  },
  (value) => value,
  ({ isMuted }) => isMuted,
);

export { AudioProvider, useAudio, useIsMuted };
