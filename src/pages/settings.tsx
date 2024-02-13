import { DevTool } from '@hookform/devtools';
import { FormProvider } from 'react-hook-form';

import {
  BoardSizeRadio,
  Divider,
  Fade,
  PlayButtonWithMessage,
  PlayerConfigsField,
  WinConditionRange,
} from '@/components';
import { useSettingsForm } from '@/hooks';

export default function Settings() {
  const { methods, onSubmit } = useSettingsForm();

  return (
    <Fade className="flex h-screen items-center justify-center text-slate-200">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <BoardSizeRadio />
          <Divider direction="horizontal" />
          <WinConditionRange />
          <Divider direction="horizontal" />
          <PlayerConfigsField />
          <PlayButtonWithMessage />
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </Fade>
  );
}
