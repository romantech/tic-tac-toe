import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components';
import { findFirstErrorPath } from '@/lib';

const validationErrorPaths = [
  'playerConfigs.X.mark',
  'playerConfigs.O.mark',
  'playerConfigs.X.color',
  'playerConfigs.O.color',
];

export default function PlayButtonWithMessage() {
  const { formState } = useFormContext();
  const { errors } = formState;

  const errorPath = findFirstErrorPath(errors, validationErrorPaths) ?? '';

  return (
    <div className="flex flex-col gap-2">
      <Button className="w-full" type="submit">
        Play
      </Button>
      <div className="text-primary">
        <ErrorMessage errors={errors} name={errorPath} />
      </div>
    </div>
  );
}
