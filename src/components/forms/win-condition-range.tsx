import { clsx } from 'clsx';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Title } from '@/components';
import { BoardSize } from '@/lib';

export default function WinConditionRange() {
  const { control } = useFormContext();
  const boardSize = useWatch({ control, name: 'size' });

  /**
   * useEffect 사용시(DOM 업데이트가 화면에 반영된 후 비동기적으로 실행) :
   * 1. 외부에서 boardSize 값 변경됨 (3 -> 5)
   * 2. 이전 winCondition 값(3)으로 페인트: rangeLabel 3에 대한 배경색 하이라이트 유지
   * 3. 이펙트 실행 후 winCondition 업데이트 (3 -> 5)
   * 4. 업데이트된 winCondition 값으로 다시 페인트: rangeLabel 배경색 하이라이트가 3에서 5로 변경되면서 깜빡임 발생
   *
   * useLayoutEffect 사용시(DOM 업데이트가 화면에 반영되기 전 동기적으로 실행) :
   * 1. 외부에서 boardSize 값 변경됨 (3 -> 5)
   * 2. 이펙트 실행 후 winCondition 업데이트 (3 -> 5)
   * 3. 업데이트된 winCondition 값으로 페인트: rangeLabel 5에 대한 배경색 하이라이트가 바로 적용되므로 깜빡임 발생 안함
   * */
  // useLayoutEffect(() => {
  //   setValue('winCondition', boardSize);
  // }, [boardSize, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <Title>win condition</Title>
      <Controller
        control={control}
        name="winCondition"
        render={({ field: { onChange, value } }) => (
          <input
            type="range"
            min={BoardSize.Size4}
            max={boardSize}
            onChange={({ target }) => onChange(+target.value)}
            step={1}
            value={value}
            disabled={boardSize < BoardSize.Size5}
            className="cursor-pointer accent-primary" // 사파리에선 막대 색상 적용 안됨
          />
        )}
      />
      <RangeLabels />
    </div>
  );
}

const RangeLabels = () => {
  const { setValue, control } = useFormContext();
  const [boardSize, winCondition] = useWatch({ control, name: ['size', 'winCondition'] });

  return (
    <ul className="flex justify-between">
      {getRangeLabels(boardSize).map((label) => (
        <li
          key={label}
          className={clsx('cursor-pointer rounded-full px-2 py-0.5 text-sm', {
            'bg-primary text-slate-800 font-semibold': label === winCondition,
            'bg-slate-600': label !== winCondition,
          })}
          onClick={() => setValue('winCondition', label)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

const getRangeLabels = (boardSize: number) => {
  if (boardSize < BoardSize.Size5) return [boardSize];
  return Array.from({ length: boardSize - BoardSize.Size3 }, (_, i) => BoardSize.Size3 + i + 1);
};
