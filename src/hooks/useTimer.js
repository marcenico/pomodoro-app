import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTimer = ({ minutes: initMinutes = 25, seconds: initSeconds = 0 } = {}) => {
  const defaultValue = { time: { minutes: initMinutes, seconds: initSeconds }, isPaused: true, isRunning: false };
  const { storedValue, setStorage } = useLocalStorage('timerData', { ...defaultValue });

  const updateTimer = ({ minutes, seconds }) => {
    const newMinutes = seconds === 0 ? minutes - 1 : minutes;
    const newSeconds = seconds === 0 ? 59 : seconds - 1;
    const newTime = { minutes: newMinutes, seconds: newSeconds };
    return newTime;
  };

  useEffect(() => {
    setStorage({ ...storedValue, time: { minutes: initMinutes, seconds: initSeconds }, isRunning: false });
  }, [initMinutes, initSeconds]);

  useEffect(() => {
    if (storedValue.isPaused) return;

    const intervalId = setInterval(() => {
      const { time } = storedValue;
      const { minutes, seconds } = time;

      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        alert('¡Tiempo cumplido!');
        setStorage({ time, isPaused: true, isRunning: false });
      } else {
        const newTime = updateTimer({ minutes, seconds });
        setStorage({ time: newTime, isPaused: false, isRunning: true });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [storedValue]);

  const startTimer = () => setStorage({ ...storedValue, isPaused: false, isRunning: true });
  const pauseTimer = () => setStorage({ ...storedValue, isPaused: true, isRunning: true });
  const stopTimer = () => setStorage({ ...storedValue, isPaused: true, isRunning: false });
  const resetTimer = () => setStorage({ ...defaultValue });

  return { ...storedValue, startTimer, pauseTimer, stopTimer, resetTimer };
};
