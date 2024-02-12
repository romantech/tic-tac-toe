import { DevTool } from '@hookform/devtools';
import { FormProvider } from 'react-hook-form';

import { Button, Divider } from '@/components';
import { BoardSizeRadio, PlayerConfigsField, WinConditionRange } from '@/components/forms';
import { useSettingsForm } from '@/hooks';

export default function Settings() {
  const { methods, onSubmit } = useSettingsForm();

  return (
    <div className="grid h-full place-content-center text-slate-200">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <BoardSizeRadio />
          <Divider direction="horizontal" />
          <WinConditionRange />
          <Divider direction="horizontal" />
          <PlayerConfigsField />
          <Button type="submit">Play</Button>
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </div>
  );
}
