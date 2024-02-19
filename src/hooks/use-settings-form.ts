import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSetGameOption, useSetScreen } from '@/context';
import { defaultGameOption, GameOption, gameOptionSchema, ScreenType } from '@/lib';

export const useSettingsForm = () => {
  const methods = useForm<GameOption>({
    resolver: zodResolver(gameOptionSchema),
    defaultValues: defaultGameOption,
  });

  const { reset: resetForm } = methods;
  const setGameOption = useSetGameOption();
  const changeScreen = useSetScreen();

  const onSubmit = useCallback(
    (data: GameOption) => {
      setGameOption(data);
      changeScreen(ScreenType.Play);
    },
    [setGameOption, changeScreen],
  );

  const reset = useCallback(() => {
    resetForm(defaultGameOption);
  }, [resetForm]);

  return { methods, onSubmit, reset };
};
