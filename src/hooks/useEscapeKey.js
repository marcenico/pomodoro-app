import { useEffect } from 'react';

/**
 * Hook personalizado para manejar la tecla Escape
 * @param {Function} callback - Función a ejecutar cuando se presiona Escape
 * @param {boolean} isActive - Si el listener debe estar activo
 */
export const useEscapeKey = (callback, isActive = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') callback();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, isActive]);
};
