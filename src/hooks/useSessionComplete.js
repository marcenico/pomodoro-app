import { useCallback } from 'react';
import { useAudio } from './useAudio';
import { useNotifications } from './useNotifications';

export const useSessionComplete = () => {
  const { playSessionCompleteSound } = useAudio();
  const { showSessionCompleteNotification } = useNotifications();

  /**
   * Maneja la finalización completa de una sesión
   * Coordina tanto el audio como las notificaciones
   * @param {string} cycleType - Tipo de ciclo completado ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Número de pomodoros completados
   */
  const handleSessionComplete = useCallback(
    async (cycleType, completedPomodoros = 0) => {
      const sound = chooseSound(cycleType, completedPomodoros);
      playSessionCompleteSound(sound);

      await showSessionCompleteNotification(cycleType, completedPomodoros); // Mostrar notificación
    },
    [playSessionCompleteSound, showSessionCompleteNotification]
  );

  /**
   * Elige el sonido a reproducir según el tipo de ciclo y el número de pomodoros completados
   * @param {string} cycleType - Tipo de ciclo completado ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Número de pomodoros completados
   * @returns {string} - El tipo de sonido a reproducir
   */
  const chooseSound = (cycleType, completedPomodoros) => {
    switch (cycleType) {
      case 'pomodoro':
        return completedPomodoros > 3 ? 'longBreak' : 'shortBreak';
      case 'shortBreak':
      case 'longBreak':
        return 'pomodoro';
      default:
        return 'pomodoro';
    }
  };

  return { handleSessionComplete };
};
