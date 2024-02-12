import { clsx } from 'clsx';

import { Divider } from '@/components';
import { ISOString, TIE_SYMBOL, TMark } from '@/lib';

interface BoardInfoProps {
  createdAt: ISOString;
  winner: TMark;
  className?: string;
}

const getDateText = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat(navigator.language, options).format(isoDate);
};

export default function BoardInfo({ createdAt, winner, className }: BoardInfoProps) {
  return (
    <header
      className={clsx(
        'flex h-10 items-center gap-2 bg-slate-600 px-2 text-sm capitalize text-slate-200',
        'bg-gradient-to-r from-slate-500 to-slate-700',
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
