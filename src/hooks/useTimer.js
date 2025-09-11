import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useCycleLogic } from './useCycleLogic';
import { useSessionNotifications } from './useSessionNotifications';

export const useTimer = ({
  minutes: initMinutes = 25,
  seconds: initSeconds = 0,
  pomodoroConfig = { minutes: 25, seconds: 0 },
  shortBreakConfig = { minutes: 5, seconds: 0 },
  longBreakConfig = { minutes: 15, seconds: 0 },
  playSessionCompleteSound
} = {}) => {
  const defaultValue = {
    time: { minutes: initMinutes, seconds: initSeconds },
    isPaused: true,
    isRunning: false,
    currentCycle: 'pomodoro',
    completedPomodoros: 0
  };

  const { storedValue, setStorage } = useLocalStorage('timerData', { ...defaultValue });
  const { handleCycleTransition, getCycleConfig } = useCycleLogic();
  const { handleSessionComplete } = useSessionNotifications();

  const configs = { pomodoroConfig, shortBreakConfig, longBreakConfig };

  /**
   * Actualiza el tiempo del timer restando un segundo
   * @param {Object} time - Objeto con minutes y seconds
   * @returns {Object} - Nuevo tiempo actualizado
   */
  const updateTimer = ({ minutes, seconds }) => {
    const newMinutes = seconds === 0 ? minutes - 1 : minutes;
    const newSeconds = seconds === 0 ? 59 : seconds - 1;
    return { minutes: newMinutes, seconds: newSeconds };
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

        // Manejar finalización completa de sesión (audio + notificación)
        handleSessionComplete(currentCycle, completedPomodoros + 1, playSessionCompleteSound).catch(console.error);

        // Manejar transición de ciclo automáticamente
        const { nextCycle, newCompletedPomodoros } = handleCycleTransition(currentCycle, completedPomodoros);
        const newTime = getCycleConfig(nextCycle, configs);

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
  }, [storedValue, handleSessionComplete, handleCycleTransition, getCycleConfig, configs]);

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
    const newTime = getCycleConfig(currentCycle, configs);
    setStorage({ ...storedValue, time: newTime, isPaused: false, isRunning: true });
  }, [storedValue, getCycleConfig, configs, setStorage]);

  const resetTimer = useCallback(() => {
    const currentCycle = storedValue.currentCycle || 'pomodoro';
    const newTime = getCycleConfig(currentCycle, configs);
    setStorage({ ...storedValue, time: newTime, isPaused: true, isRunning: false });
  }, [storedValue, getCycleConfig, configs, setStorage]);

  const changeCycle = useCallback(
    (newCycle) => {
      const newTime = getCycleConfig(newCycle, configs);
      setStorage({ ...storedValue, currentCycle: newCycle, time: newTime, isPaused: true, isRunning: false });
    },
    [storedValue, getCycleConfig, configs, setStorage]
  );

  return { ...storedValue, startTimer, pauseTimer, stopTimer, resetTimer, refreshTimer, changeCycle };
};
