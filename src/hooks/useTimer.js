import { useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useCycleLogic } from './useCycleLogic';
import { useSessionNotifications } from './useSessionNotifications';
import {
  calculateRemainingTime,
  timeToMilliseconds,
  createTimerEndState,
  createTimerRunningState,
  shouldUpdateTimer
} from '../helpers/timerUtils';

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
  const intervalRef = useRef(null);
  const lastUpdateRef = useRef(0);

  const configs = { pomodoroConfig, shortBreakConfig, longBreakConfig };

  /**
   * Limpia el interval del timer
   */
  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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

  useEffect(
    () => {
      if (storedValue.isPaused || !storedValue.startTime || !storedValue.duration) {
        clearTimerInterval();
        return;
      }

      const updateTimer = () => {
        const now = Date.now();

        // Actualizar cada 100ms
        if (shouldUpdateTimer(now, lastUpdateRef.current)) {
          setStorage((prevState) => {
            const { startTime, duration, currentCycle, completedPomodoros } = prevState;
            const remainingTime = calculateRemainingTime(startTime, duration);

            if (remainingTime.minutes <= 0 && remainingTime.seconds <= 0) {
              // Manejar finalización completa de sesión (audio + notificación)
              handleSessionComplete(currentCycle, completedPomodoros + 1, playSessionCompleteSound).catch(
                console.error
              );

              const newState = handleAutomaticCycleTransition(currentCycle, completedPomodoros);
              setStorage(newState);

              // Retornar estado de finalización usando utilidad
              return createTimerEndState(currentCycle, completedPomodoros, startTime, duration);
            } else {
              // Retornar estado de ejecución usando utilidad
              return createTimerRunningState(remainingTime, currentCycle, completedPomodoros, startTime, duration);
            }
          });
          lastUpdateRef.current = now;
        }
      };

      // Usar setInterval con frecuencia más alta
      intervalRef.current = setInterval(updateTimer, 100);
      return () => clearTimerInterval();
    },
    [
      storedValue.isPaused,
      storedValue.startTime,
      storedValue.duration,
      handleSessionComplete,
      handleCycleTransition,
      getCycleConfig,
      configs
    ],
    100
  );

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
    setStorage({ ...storedValue, isPaused: true, isRunning: false, startTime: null, duration: null });
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
