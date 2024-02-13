import { DevTool } from '@hookform/devtools';
import { FormProvider } from 'react-hook-form';

import {
  BoardSizeRadio,
  Box,
  Button,
  Divider,
  Fade,
  FirstErrorMessage,
  PlayerConfigsField,
  WinConditionRange,
} from '@/components';
import { useSettingsForm } from '@/hooks';

export default function Settings() {
  const { methods, onSubmit, reset } = useSettingsForm();
  const { isDirty } = methods.formState;

  return (
    <Fade className="flex h-screen items-center justify-center text-slate-200">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <BoardSizeRadio />
          <Divider direction="horizontal" />
          <WinConditionRange />
          <Divider direction="horizontal" />
          <PlayerConfigsField />
          <Box className="flex flex-col gap-2">
            <div className="flex grow gap-2">
              <Button className="grow capitalize" onClick={reset} disabled={!isDirty}>
                reset
              </Button>
              <Button className="grow capitalize" type="submit">
                play
              </Button>
            </div>
            <FirstErrorMessage className="mr-auto" />
          </Box>
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </Fade>
  );
}
