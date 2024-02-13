import { ErrorMessage } from '@hookform/error-message';
import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

import { Fade } from '@/components';
import { findFirstErrorPath } from '@/lib';

const validationErrorPaths = [
  'playerConfigs.X.mark',
  'playerConfigs.O.mark',
  'playerConfigs.X.color',
  'playerConfigs.O.color',
];

export default function FirstErrorMessage({ className }: { className?: string }) {
  const { formState } = useFormContext();
  const { errors } = formState;

  const errorPath = findFirstErrorPath(errors, validationErrorPaths) ?? '';

  return (
    <Fade duration={300} className={clsx('min-h-6 text-primary', className)}>
      <ErrorMessage errors={errors} name={errorPath} />
    </Fade>
  );
}
