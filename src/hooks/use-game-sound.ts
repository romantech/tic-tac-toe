import { useEffect, useRef } from 'react';

import gameOverTie from '@/assets/sound/game-over-tie.mp3';
import gameOver from '@/assets/sound/game-over.mp3';
import soundO from '@/assets/sound/note-high.mp3';
import soundX from '@/assets/sound/note-low.mp3';
import { useIsMuted } from '@/context';
import { BasePlayer } from '@/lib';

const soundPath = [gameOver, gameOverTie, soundO, soundX];
type SoundPath = (typeof soundPath)[number];

export const useGameSound = () => {
  const isMuted = useIsMuted();
  const audioRef = useRef<Map<SoundPath, HTMLAudioElement>>(new Map());
  // const currentPlaying = useRef<HTMLAudioElement | null>(null);

  // 오디오 파일을 미리 로드
  useEffect(() => {
    const preload = (soundPath: SoundPath) => {
      const audio = new Audio(soundPath);
      audioRef.current.set(soundPath, audio);
    };

    soundPath.forEach(preload);
  }, []);

  const playSound = (soundPath: SoundPath) => {
    const audio = audioRef.current.get(soundPath);
    if (isMuted || !audio) return;

    // // 오디오가 재생중이면
    // if (currentPlaying.current?.paused === false) {
    //   currentPlaying.current.pause();
    //   currentPlaying.current.currentTime = 0;
    // }

    audio.play().catch((error) => console.error('Failed to play sound', error));
    // .finally(() => (currentPlaying.current = audio));
  };

  const mark = (identifier: BasePlayer) => playSound(identifier === BasePlayer.X ? soundX : soundO);

  const end = (isTied: boolean) => {
    // 마지막 마크 사운드와 안겹치도록 딜레이 추가
    setTimeout(() => playSound(isTied ? gameOverTie : gameOver), 350);
  };

  return { mark, end };
};
