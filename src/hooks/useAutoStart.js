import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook para manejar el estado del inicio automático del timer
 * @returns {Object} - Estado y funciones para controlar el inicio automático
 */
export const useAutoStart = () => {
  const { storedValue: autoStart, setStorage: setAutoStart } = useLocalStorage('autoStart', true);

  /**
   * Alterna el estado del inicio automático
   */
  const toggleAutoStart = useCallback(() => {
    setAutoStart(!autoStart);
  }, [autoStart, setAutoStart]);

  /**
   * Establece el estado del inicio automático
   * @param {boolean} value - Nuevo valor para el inicio automático
   */
  const setAutoStartValue = useCallback(
    (value) => {
      setAutoStart(value);
    },
    [setAutoStart]
  );

  return {
    autoStart,
    toggleAutoStart,
    setAutoStartValue
  };
};
