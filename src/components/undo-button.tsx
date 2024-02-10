import { ButtonHTMLAttributes } from 'react';

export default function UndoButton({
  children,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...buttonProps}>{children}</button>;
}
