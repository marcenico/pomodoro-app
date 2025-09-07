import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTimer = ({
  minutes: initMinutes = 25,
  seconds: initSeconds = 0,
  pomodoroTime = 25,
  shortBreakTime = 5,
  longBreakTime = 15
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
  const getCycleConfig = (cycle, pomodoroTime, shortBreakTime, longBreakTime) => {
    switch (cycle) {
      case 'pomodoro':
        return { minutes: pomodoroTime, seconds: 0 };
      case 'shortBreak':
        return { minutes: shortBreakTime, seconds: 0 };
      case 'longBreak':
        return { minutes: longBreakTime, seconds: 0 };
      default:
        return { minutes: pomodoroTime, seconds: 0 };
    }
  };

  // Función para manejar la transición de ciclos
  const handleCycleTransition = (currentCycle, completedPomodoros) => {
    if (currentCycle === 'pomodoro') {
      // Después de un pomodoro, ir a descanso corto
      return {
        nextCycle: 'shortBreak',
        newCompletedPomodoros: completedPomodoros + 1
      };
    } else if (currentCycle === 'shortBreak') {
      // Después de un descanso corto, verificar si es hora del descanso largo
      if (completedPomodoros >= 4) {
        return {
          nextCycle: 'longBreak',
          newCompletedPomodoros: 0 // Resetear contador después del descanso largo
        };
      } else {
        return {
          nextCycle: 'pomodoro',
          newCompletedPomodoros: completedPomodoros
        };
      }
    } else if (currentCycle === 'longBreak') {
      // Después de un descanso largo, volver a pomodoro
      return {
        nextCycle: 'pomodoro',
        newCompletedPomodoros: 0
      };
    }
    return { nextCycle: 'pomodoro', newCompletedPomodoros: 0 };
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
        const newTime = getCycleConfig(nextCycle, pomodoroTime, shortBreakTime, longBreakTime);

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
  }, [storedValue, pomodoroTime, shortBreakTime, longBreakTime]);

  const startTimer = () => setStorage({ ...storedValue, isPaused: false, isRunning: true });
  const pauseTimer = () => setStorage({ ...storedValue, isPaused: true, isRunning: true });
  const stopTimer = () => setStorage({ ...storedValue, isPaused: true, isRunning: false });
  const refreshTimer = () => setStorage({ ...defaultValue, isPaused: false, isRunning: true });
  const resetTimer = () => setStorage({ ...defaultValue });

  return { ...storedValue, startTimer, pauseTimer, stopTimer, resetTimer, refreshTimer };
};
