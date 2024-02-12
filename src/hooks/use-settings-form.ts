import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { BoardSize, defaultPlayerConfigs, GameOption, gameOptionSchema, Player } from '@/lib';

const defaultValues: GameOption = {
  size: BoardSize.Size3,
  winCondition: BoardSize.Size3,
  firstPlayer: Player.X,
  playerConfigs: defaultPlayerConfigs,
};

export const useSettingsForm = () => {
  const methods = useForm<GameOption>({
    resolver: zodResolver(gameOptionSchema),
    defaultValues,
  });

  const onSubmit = (data: GameOption) => {
    console.log(data);
  };

  return { methods, onSubmit };
};
