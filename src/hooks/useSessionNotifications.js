import { useCallback } from 'react';
import { useNotifications } from './useNotifications';
import { useSoundSelection } from './useSoundSelection';
import { isExtensionContext } from '../helpers/extensionContext';

/**
 * Hook para manejar notificaciones y sonidos de finalización de sesión
 * Sigue el principio de Responsabilidad Única (SRP)
 */
export const useSessionNotifications = () => {
  const { showSessionCompleteNotification } = useNotifications();
  const { chooseSound } = useSoundSelection();

  /**
   * Maneja la finalización completa de una sesión
   * Coordina tanto el audio como las notificaciones
   * @param {string} cycleType - Tipo de ciclo completado ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Número de pomodoros completados
   * @param {Function} playSessionCompleteSound - Función para reproducir sonido
   */
  const handleSessionComplete = useCallback(
    async (cycleType, completedPomodoros, playSessionCompleteSound) => {
      // Reproducir sonido si la función está disponible
      if (playSessionCompleteSound) {
        const sound = chooseSound(cycleType, completedPomodoros);
        playSessionCompleteSound(sound);
      }

      // En la extensión, el service worker ya muestra la notificación vía
      // chrome.alarms (funciona con el popup cerrado); evitar duplicarla aquí.
      if (!isExtensionContext()) {
        await showSessionCompleteNotification(cycleType, completedPomodoros);
      }
    },
    [chooseSound, showSessionCompleteNotification]
  );

  return { handleSessionComplete };
};
