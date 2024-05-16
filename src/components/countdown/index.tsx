import CountdownItem from '@/components/countdown/item';
import useCountdown from '@/hooks/useCountdown';
import { FC, useMemo } from 'react';

interface CountdownProps {
  date: Date | string;
}

const Countdown: FC<CountdownProps> = ({ date }) => {
  const countdown = useCountdown(date);

  const isYearsNotZero = useMemo(() => {
    if (!countdown) return false;
    return !!countdown.years;
  }, [countdown]);

  if (!countdown) return null;

  return (
    <div className="flex justify-center gap-2">
      {isYearsNotZero ? (
        <CountdownItem
          data={countdown.years}
          title="Years"
        />
      ) : (
        <CountdownItem
          data={countdown.days}
          title="Days"
        />
      )}

      {isYearsNotZero ? (
        <CountdownItem
          data={countdown.months}
          title="Months"
        />
      ) : (
        <CountdownItem
          data={countdown.hours}
          title="Hours"
        />
      )}

      {isYearsNotZero ? (
        <CountdownItem
          data={countdown.weeks}
          title="Weeks"
        />
      ) : (
        <CountdownItem
          data={countdown.minutes}
          title="Minutes"
        />
      )}
    </div>
  );
};

export default Countdown;
