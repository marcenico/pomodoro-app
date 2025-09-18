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
    completedPomodoros: 0,
    startTime: null,
    duration: null
  };

  const { storedValue, setStorage } = useLocalStorage('timerData', { ...defaultValue });
  const { handleCycleTransition, getCycleConfig } = useCycleLogic();
  const { handleSessionComplete } = useSessionNotifications();

  const configs = { pomodoroConfig, shortBreakConfig, longBreakConfig };

  /**
   * Calcula el tiempo restante basándose en timestamps reales
   * @param {number} startTime - Timestamp de inicio en ms
   * @param {number} duration - Duración total en ms
   * @returns {Object} - Tiempo restante en formato { minutes, seconds }
   */
  const calculateRemainingTime = (startTime, duration) => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, duration - elapsed);

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    return { minutes, seconds };
  };

  /**
   * Convierte tiempo en formato { minutes, seconds } a milisegundos
   * @param {Object} time - Objeto con minutes y seconds
   * @returns {number} - Tiempo en milisegundos
   */
  const timeToMilliseconds = ({ minutes, seconds }) => {
    return (minutes * 60 + seconds) * 1000;
  };

  /**
   * Maneja la transición automática de ciclo cuando el timer termina
   * @param {string} currentCycle - Ciclo actual
   * @param {number} completedPomodoros - Pomodoros completados
   * @returns {Object} - Nuevo estado del timer
   */
  const handleAutomaticCycleTransition = (currentCycle, completedPomodoros) => {
    const { nextCycle, newCompletedPomodoros } = handleCycleTransition(currentCycle, completedPomodoros);
    const newTime = getCycleConfig(nextCycle, configs);
    const newDuration = timeToMilliseconds(newTime);
    const newStartTime = Date.now();

    return {
      time: newTime,
      isPaused: false,
      isRunning: true,
      currentCycle: nextCycle,
      completedPomodoros: newCompletedPomodoros,
      startTime: newStartTime,
      duration: newDuration
    };
  };

  // Solo inicializar el timer si no hay un timer en ejecución
  useEffect(() => {
    if (!storedValue.isRunning) {
      const newTime = { minutes: initMinutes, seconds: initSeconds };
      setStorage({
        ...storedValue,
        time: newTime,
        isRunning: false,
        startTime: null,
        duration: null
      });
    }
  }, [initMinutes, initSeconds]);

  useEffect(() => {
    if (storedValue.isPaused || !storedValue.startTime || !storedValue.duration) return;

    const intervalId = setInterval(() => {
      setStorage((prevState) => {
        const { startTime, duration, currentCycle, completedPomodoros } = prevState;
        const remainingTime = calculateRemainingTime(startTime, duration);

        if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
          // Manejar finalización completa de sesión (audio + notificación)
          handleSessionComplete(currentCycle, completedPomodoros + 1, playSessionCompleteSound).catch(console.error);

          // Manejar transición de ciclo automáticamente
          return handleAutomaticCycleTransition(currentCycle, completedPomodoros);
        } else {
          return {
            time: remainingTime,
            isPaused: false,
            isRunning: true,
            currentCycle,
            completedPomodoros,
            startTime,
            duration
          };
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    storedValue.isPaused,
    storedValue.startTime,
    storedValue.duration,
    handleSessionComplete,
    handleCycleTransition,
    getCycleConfig,
    configs
  ]);

  // Memoizar las funciones de control del timer para evitar re-renders innecesarios
  const startTimer = useCallback(() => {
    const { time } = storedValue;
    const duration = timeToMilliseconds(time);
    const startTime = Date.now();

    setStorage({
      ...storedValue,
      isPaused: false,
      isRunning: true,
      startTime,
      duration
    });
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
    const duration = timeToMilliseconds(newTime);
    const startTime = Date.now();

    setStorage({
      ...storedValue,
      time: newTime,
      isPaused: false,
      isRunning: true,
      startTime,
      duration
    });
  }, [storedValue, getCycleConfig, configs, setStorage]);

  const resetTimer = useCallback(() => {
    const currentCycle = storedValue.currentCycle || 'pomodoro';
    const newTime = getCycleConfig(currentCycle, configs);
    setStorage({
      ...storedValue,
      time: newTime,
      isPaused: true,
      isRunning: false,
      startTime: null,
      duration: null
    });
  }, [storedValue, getCycleConfig, configs, setStorage]);

  const changeCycle = useCallback(
    (newCycle) => {
      const newTime = getCycleConfig(newCycle, configs);
      setStorage({
        ...storedValue,
        currentCycle: newCycle,
        time: newTime,
        isPaused: true,
        isRunning: false,
        startTime: null,
        duration: null
      });
    },
    [storedValue, getCycleConfig, configs, setStorage]
  );

  return { ...storedValue, startTimer, pauseTimer, stopTimer, resetTimer, refreshTimer, changeCycle };
};
