import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook para manejar la configuración de la aplicación
 * Incluye la sesión seleccionada y la configuración personalizada
 * @returns {Object} - Estado y funciones para controlar la configuración de la app
 */
export const useAppSettings = () => {
  // Configuración por defecto
  const defaultSelectedSession = 'classic-pomodoro';
  const defaultCustomConfig = {
    pomodoro: { minutes: 25, seconds: 0 },
    shortBreak: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 15, seconds: 0 }
  };

  // Estado para la sesión seleccionada
  const { storedValue: selectedSession, setStorage: setSelectedSession } = useLocalStorage(
    'selectedSession',
    defaultSelectedSession
  );

  // Estado para la configuración personalizada
  const { storedValue: customSessionConfig, setStorage: setCustomSessionConfig } = useLocalStorage(
    'customSessionConfig',
    defaultCustomConfig
  );

  /**
   * Cambia la sesión seleccionada
   * @param {string} sessionId - ID de la sesión a seleccionar
   */
  const handleSessionChange = useCallback(
    (sessionId) => {
      setSelectedSession(sessionId);
    },
    [setSelectedSession]
  );

  /**
   * Actualiza la configuración personalizada
   * @param {Object} config - Nueva configuración personalizada
   */
  const handleCustomSessionChange = useCallback(
    (config) => {
      setCustomSessionConfig(config);
    },
    [setCustomSessionConfig]
  );

  /**
   * Resetea la configuración personalizada a los valores por defecto
   */
  const resetCustomConfig = useCallback(() => {
    setCustomSessionConfig(defaultCustomConfig);
  }, [setCustomSessionConfig]);

  return {
    selectedSession,
    customSessionConfig,
    handleSessionChange,
    handleCustomSessionChange,
    resetCustomConfig
  };
};
