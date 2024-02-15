import { clsx } from 'clsx';

import { Divider } from '@/components';
import { getDateText, ISODateString, TIE_SYMBOL, TMark } from '@/lib';

interface BoardInfoProps {
  createdAt: ISODateString;
  winner: TMark;
  className?: string;
}

export default function BoardInfo({ createdAt, winner, className }: BoardInfoProps) {
  return (
    <header
      className={clsx(
        'flex h-10 items-center gap-2 px-2 text-sm capitalize text-slate-200',
        'rounded-tl-2xl bg-gradient-to-r from-slate-800 to-slate-600',
        'border-x-2 border-t-2 border-slate-700',
        className,
      )}
    >
      <div className="flex w-5/12 items-center justify-center gap-2 font-semibold">
        <span>winner</span>
        <div className="grid size-6 place-content-center rounded-full bg-slate-800 capitalize">
          {winner ?? TIE_SYMBOL}
        </div>
      </div>
      <Divider className="bg-slate-800 opacity-30" />
      <time className="grid grow place-content-center" dateTime={createdAt}>
        {getDateText(createdAt)}
      </time>
    </header>
  );
}
