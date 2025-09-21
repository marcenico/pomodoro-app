import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook para manejar el estado del inicio automático del timer
 * Maneja dos estados separados: uno para Pomodoro y otro para Break
 * @returns {Object} - Estado y funciones para controlar el inicio automático
 */
export const useAutoStart = () => {
  const defaultValue = {
    pomodoro: true,
    break: true
  };

  const { storedValue: autoStartSettings, setStorage: setAutoStartSettings } = useLocalStorage(
    'autoStartSettings',
    defaultValue
  );

  /**
   * Alterna el estado del inicio automático para Pomodoro
   */
  const togglePomodoroAutoStart = useCallback(() => {
    setAutoStartSettings((prev) => ({
      ...prev,
      pomodoro: !prev.pomodoro
    }));
  }, [setAutoStartSettings]);

  /**
   * Alterna el estado del inicio automático para Break
   */
  const toggleBreakAutoStart = useCallback(() => {
    setAutoStartSettings((prev) => ({
      ...prev,
      break: !prev.break
    }));
  }, [setAutoStartSettings]);

  /**
   * Establece el estado del inicio automático para Pomodoro
   * @param {boolean} value - Nuevo valor para el inicio automático de Pomodoro
   */
  const setPomodoroAutoStart = useCallback(
    (value) => {
      setAutoStartSettings((prev) => ({
        ...prev,
        pomodoro: value
      }));
    },
    [setAutoStartSettings]
  );

  /**
   * Establece el estado del inicio automático para Break
   * @param {boolean} value - Nuevo valor para el inicio automático de Break
   */
  const setBreakAutoStart = useCallback(
    (value) => {
      setAutoStartSettings((prev) => ({
        ...prev,
        break: value
      }));
    },
    [setAutoStartSettings]
  );

  /**
   * Obtiene el estado de inicio automático para un tipo de ciclo específico
   * @param {string} cycleType - Tipo de ciclo ('pomodoro', 'shortBreak', 'longBreak')
   * @returns {boolean} - True si debe iniciar automáticamente
   */
  const getAutoStartForCycle = useCallback(
    (cycleType) => {
      if (cycleType === 'pomodoro') {
        return autoStartSettings.pomodoro;
      } else {
        return autoStartSettings.break;
      }
    },
    [autoStartSettings]
  );

  return {
    autoStartSettings,
    togglePomodoroAutoStart,
    toggleBreakAutoStart,
    setPomodoroAutoStart,
    setBreakAutoStart,
    getAutoStartForCycle
  };
};
