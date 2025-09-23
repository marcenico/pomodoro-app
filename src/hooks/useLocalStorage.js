import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Verificar que el item existe y no es "undefined" o "null"
      if (item && item !== 'undefined' && item !== 'null') {
        return JSON.parse(item);
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      // Limpiar el valor inválido del localStorage
      localStorage.removeItem(key);
      return defaultValue;
    }
  });

  const setStorage = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item ${key}:`, error);
    }
  };

  return { storedValue, setStorage };
};
