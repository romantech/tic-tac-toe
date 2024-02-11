import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Divider } from '@/components';
import { BoardSizeRadio, MarkTextInput, WinConditionRange } from '@/components/forms';
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
    <div className="grid h-full place-content-center text-slate-200">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <BoardSizeRadio />
          <Divider direction="horizontal" />
          <WinConditionRange />
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-2">
            <h3 className="pb-1 text-2xl font-semibold uppercase">players info</h3>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-slate-700 px-2 py-1 font-medium">Player A</span>
              <MarkTextInput name="playersInfo.X.mark" />
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-slate-700 px-2 py-1 font-medium">Player B</span>
              <MarkTextInput name="playersInfo.O.mark" />
            </div>
          </div>
          <button type="submit">Play</button>
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </div>
  );
}
