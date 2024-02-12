import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components';

const playerMarkPaths = ['playerConfigs.X.mark', 'playerConfigs.O.mark'];

const findFirstError = (errors: Record<string, unknown>, errorPaths: string[]) => {
  for (const path of errorPaths) {
    const pathParts = path.split('.');
    const hasError = pathParts.reduce(
      (error, key) => {
        if (error?.[key]) return error[key] as Record<string, unknown>;
        return null;
      },
      errors as Record<string, unknown> | null,
    );
    if (hasError) return path;
  }
  return null;
};

export default function PlayButtonWithMessage() {
  const { formState } = useFormContext();
  const { errors } = formState;

  const firstErrorPath = findFirstError(errors, playerMarkPaths);

  return (
    <div className="flex flex-col gap-2">
      <Button className="w-full" type="submit">
        Play
      </Button>
      <div className="text-primary">
        <ErrorMessage errors={errors} name={firstErrorPath ?? ''} />
      </div>
    </div>
  );
}
