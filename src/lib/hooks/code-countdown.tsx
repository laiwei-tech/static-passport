import { useEffect, useState } from 'react';

export const useCountdown = (seconds: number) => {
  const [count, setCount] = useState(seconds);
  const [isCounting, setIsCounting] = useState(false);

  const startCountdown = () => {
    setIsCounting(true);
    setCount(seconds);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isCounting) {
      intervalId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount === 0) {
            setIsCounting(false);
            clearInterval(intervalId);
            return seconds;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isCounting, seconds]);

  return { count, startCountdown, isCounting };
};
