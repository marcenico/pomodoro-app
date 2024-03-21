import { useEffect, useState } from 'react';

export const useTimer = ({ minutes: initialMinutes = 25, seconds: initialSeconds = 0 } = {}) => {
  if (initialSeconds >= 60) initialSeconds = 0;
  if (initialMinutes > 100) initialMinutes = 100;

  const [time, setTime] = useState({ minutes: initialMinutes, seconds: initialSeconds });
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            alert('¡Tiempo cumplido!');
            setIsPaused(true);
            return prevTime;
          } else {
            const newMinutes = seconds === 0 ? minutes - 1 : minutes;
            const newSeconds = seconds === 0 ? 59 : seconds - 1;
            return { minutes: newMinutes, seconds: newSeconds };
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const startTimer = () => {
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsPaused(true);
    setTime({ minutes: initialMinutes, seconds: initialSeconds });
  };

  return { time, isPaused, startTimer, pauseTimer, resetTimer };
};
