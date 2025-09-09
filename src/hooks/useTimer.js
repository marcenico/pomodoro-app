import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTimer = ({
  minutes: initMinutes = 25,
  seconds: initSeconds = 0,
  pomodoroConfig = { minutes: 25, seconds: 0 },
  shortBreakConfig = { minutes: 5, seconds: 0 },
  longBreakConfig = { minutes: 15, seconds: 0 }
} = {}) => {
  const defaultValue = {
    time: { minutes: initMinutes, seconds: initSeconds },
    isPaused: true,
    isRunning: false,
    currentCycle: 'pomodoro',
    completedPomodoros: 0
  };
  const { storedValue, setStorage } = useLocalStorage('timerData', { ...defaultValue });

  const updateTimer = ({ minutes, seconds }) => {
    const newMinutes = seconds === 0 ? minutes - 1 : minutes;
    const newSeconds = seconds === 0 ? 59 : seconds - 1;
    const newTime = { minutes: newMinutes, seconds: newSeconds };
    return newTime;
  };

  // Función para obtener la configuración de tiempo según el ciclo actual
  const getCycleConfig = (cycle) => {
    switch (cycle) {
      case 'pomodoro':
        return pomodoroConfig;
      case 'shortBreak':
        return shortBreakConfig;
      case 'longBreak':
        return longBreakConfig;
      default:
        return pomodoroConfig;
    }
  };

  // Función para manejar la transición de ciclos
  const handleCycleTransition = (currentCycle, completedPomodoros) => {
    switch (currentCycle) {
      case 'pomodoro':
        return completedPomodoros >= 3
          ? { nextCycle: 'longBreak', newCompletedPomodoros: 0 }
          : { nextCycle: 'shortBreak', newCompletedPomodoros: completedPomodoros + 1 };
      case 'shortBreak':
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
      case 'longBreak':
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
      default:
        return { nextCycle: 'pomodoro', newCompletedPomodoros: completedPomodoros };
    }
  };

  useEffect(() => {
    setStorage({ ...storedValue, time: { minutes: initMinutes, seconds: initSeconds }, isRunning: false });
  }, [initMinutes, initSeconds]);

  useEffect(() => {
    if (storedValue.isPaused) return;

    const intervalId = setInterval(() => {
      const { time, currentCycle, completedPomodoros } = storedValue;
      const { minutes, seconds } = time;

      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);

        // Manejar transición de ciclo automáticamente
        const { nextCycle, newCompletedPomodoros } = handleCycleTransition(currentCycle, completedPomodoros);
        const newTime = getCycleConfig(nextCycle);

        setStorage({
          time: newTime,
          isPaused: false,
          isRunning: true,
          currentCycle: nextCycle,
          completedPomodoros: newCompletedPomodoros
        });
      } else {
        const newTime = updateTimer({ minutes, seconds });
        setStorage({
          time: newTime,
          isPaused: false,
          isRunning: true,
          currentCycle,
          completedPomodoros
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [storedValue, pomodoroConfig, shortBreakConfig, longBreakConfig]);

  // Memoizar las funciones de control del timer para evitar re-renders innecesarios
  const startTimer = useCallback(() => {
    setStorage({ ...storedValue, isPaused: false, isRunning: true });
  }, [storedValue, setStorage]);

  const pauseTimer = useCallback(() => {
    setStorage({ ...storedValue, isPaused: true, isRunning: true });
  }, [storedValue, setStorage]);

  const stopTimer = useCallback(() => {
    setStorage({ ...storedValue, isPaused: true, isRunning: false });
  }, [storedValue, setStorage]);

  const refreshTimer = useCallback(() => {
    const currentCycle = storedValue.currentCycle || 'pomodoro';
    const newTime = getCycleConfig(currentCycle);
    setStorage({ ...storedValue, time: newTime, isPaused: false, isRunning: true });
  }, [storedValue, getCycleConfig, setStorage]);

  const resetTimer = useCallback(() => {
    const currentCycle = storedValue.currentCycle || 'pomodoro';
    const newTime = getCycleConfig(currentCycle);
    setStorage({ ...storedValue, time: newTime, isPaused: true, isRunning: false });
  }, [storedValue, getCycleConfig, setStorage]);

  const changeCycle = useCallback(
    (newCycle) => {
      const newTime = getCycleConfig(newCycle);
      setStorage({ ...storedValue, currentCycle: newCycle, time: newTime, isPaused: true, isRunning: false });
    },
    [storedValue, getCycleConfig, setStorage]
  );

  return { ...storedValue, startTimer, pauseTimer, stopTimer, resetTimer, refreshTimer, changeCycle };
};
