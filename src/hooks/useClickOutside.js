import { useEffect, useRef } from 'react';

/**
 * Hook para detectar clics fuera de un elemento
 * @param {Function} callback - Función a ejecutar cuando se hace clic fuera
 * @param {Object} excludeRef - Ref del elemento que debe ser excluido de la detección
 * @returns {Object} - Ref para asignar al elemento que queremos monitorear
 */
export const useClickOutside = (callback, excludeRef = null) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar que el clic no sea en el elemento principal
      if (ref.current && !ref.current.contains(event.target)) {
        // Verificar que el clic no sea en el elemento excluido
        if (!excludeRef?.current || !excludeRef.current.contains(event.target)) {
          callback();
        }
      }
    };

    // Agregar el event listener cuando el componente se monta
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, excludeRef]);

  return ref;
};
