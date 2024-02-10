import { clsx } from 'clsx';

export default function Divider({ className }: { className?: string }) {
  return (
    <div
      className={clsx('inline-block min-h-1 w-px self-stretch bg-slate-600 opacity-90', className)}
    ></div>
  );
}
