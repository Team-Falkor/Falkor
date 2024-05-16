import { useEffect, useState } from 'react';

type CountdownResult = {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateCountdown = (targetDate: Date): CountdownResult => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  // Calculate years, months, and days
  let years = targetDate.getFullYear() - now.getFullYear();
  let months = targetDate.getMonth() - now.getMonth();
  let days = targetDate.getDate() - now.getDate();

  if (days < 0) {
    months -= 1;
    const copy = new Date(now.getTime());
    copy.setMonth(copy.getMonth() + 1);
    days += Math.floor((targetDate.getTime() - copy.getTime()) / (1000 * 60 * 60 * 24));
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Calculate weeks, hours, minutes, and seconds
  const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
};

const parseDate = (date: Date | string): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

const useCountdown = (targetDate: Date | string, customInterval?: number): CountdownResult | null => {
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);

  useEffect(() => {
    const parsedDate = parseDate(targetDate);
    const interval = setInterval(() => {
      const result = calculateCountdown(parsedDate);
      setCountdown(result);
    }, customInterval || 1000);

    return () => clearInterval(interval);
  }, [targetDate, customInterval]);

  return countdown;
};

export default useCountdown;
