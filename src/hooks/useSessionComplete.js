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
      // Reproducir sonido inmediatamente
      playSessionCompleteSound(cycleType);

      // Mostrar notificación
      await showSessionCompleteNotification(cycleType, completedPomodoros);
    },
    [playSessionCompleteSound, showSessionCompleteNotification]
  );

  return { handleSessionComplete };
};
