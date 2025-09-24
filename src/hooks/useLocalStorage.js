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
      // Si value es una función, la ejecutamos con el valor actual
      const newValue = typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage item ${key}:`, error);
    }
  };

  return { storedValue, setStorage };
};
