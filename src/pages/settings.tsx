import { FormProvider } from 'react-hook-form';

import {
  BoardSizeRadio,
  Box,
  Button,
  DevToolWrapper,
  Divider,
  Fade,
  FirstErrorMessage,
  GameModeRadio,
  PlayerConfigsField,
  WinConditionRange,
} from '@/components';
import { useSettingsForm } from '@/hooks';

export default function Settings() {
  const { methods, onSubmit, reset } = useSettingsForm();
  const { isDirty } = methods.formState;

  return (
    <Fade className="m-auto flex max-w-full items-center justify-center">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <GameModeRadio />
          <Divider direction="horizontal" />
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
          <DevToolWrapper control={methods.control} />
        </form>
      </FormProvider>
    </Fade>
  );
}
