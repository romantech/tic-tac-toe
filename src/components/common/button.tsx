import { ComponentProps } from 'react';

import { clsx } from 'clsx';

type ButtonVariant = 'solid' | 'outline';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

const getVariantClasses = (variant: ButtonVariant, disabled: boolean = false) => {
  const classes = [];

  if (disabled) {
    classes.push('bg-slate-600/30 text-slate-500 cursor-not-allowed');
    if (variant === 'outline') classes.push('border border-slate-500');
    return classes.join(' ');
  }

  switch (variant) {
    case 'solid':
      classes.push('bg-slate-600/80 hover:bg-slate-600');
      break;
    case 'outline':
      classes.push('border border-slate-500 hover:bg-slate-700/80');
      break;
    default:
      throw new Error(`Invalid variant: ${variant}`);
  }

  return classes.join(' ');
};

export default function Button({
  children,
  disabled,
  className,
  variant = 'solid',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        ['rounded-md px-3 py-2 font-medium shadow-md transition-all duration-300', className],
        getVariantClasses(variant, disabled),
      )}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
