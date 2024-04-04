import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTimer = ({ minutes: initialMinutes = 25, seconds: initialSeconds = 0 } = {}) => {
  if (initialSeconds >= 60) initialSeconds = 0;
  if (initialMinutes > 100) initialMinutes = 100;

  const defaultTime = { minutes: initialMinutes, seconds: initialSeconds };
  const { storedValue, setValue: setTimerData } = useLocalStorage('timerData', {
    time: defaultTime,
    isPaused: true
  });

  const [timerData, setTimerDataState] = useState(storedValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerDataState((prevTimerData) => {
        const { time, isPaused } = prevTimerData;
        if (!isPaused) {
          const { minutes, seconds } = time;
          if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            alert('¡Tiempo cumplido!');
            return { time, isPaused: true };
          } else {
            const newMinutes = seconds === 0 ? minutes - 1 : minutes;
            const newSeconds = seconds === 0 ? 59 : seconds - 1;
            const newTime = { minutes: newMinutes, seconds: newSeconds };
            setTimerData({ time: newTime, isPaused });
            return { time: newTime, isPaused };
          }
        }
        return prevTimerData;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTimerData]);

  const startTimer = () => {
    setTimerData({ ...timerData, isPaused: false });
    setTimerDataState({ ...timerData, isPaused: false });
  };

  const pauseTimer = () => {
    setTimerData({ ...timerData, isPaused: true });
    setTimerDataState({ ...timerData, isPaused: true });
  };

  const resetTimer = () => {
    setTimerData({ time: defaultTime, isPaused: true });
    setTimerDataState({ time: defaultTime, isPaused: true });
  };

  return { ...timerData, startTimer, pauseTimer, resetTimer };
};
