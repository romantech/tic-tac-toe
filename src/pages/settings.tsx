import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { SizeField } from '@/components/forms';
import { BoardSize, defaultPlayersInfo, GameOption, gameSettingSchema, Player } from '@/lib';

const defaultValues: GameOption = {
  size: BoardSize.Size3,
  winCondition: BoardSize.Size3,
  firstPlayer: Player.X,
  playersInfo: defaultPlayersInfo,
};

export default function Settings() {
  const methods = useForm<GameOption>({
    resolver: zodResolver(gameSettingSchema),
    defaultValues,
  });

  const onSubmit = (data: GameOption) => {
    console.log(data);
  };

  return (
    <div className="text-slate-200">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SizeField />
          <button type="submit">Play</button>
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </div>
  );
}
