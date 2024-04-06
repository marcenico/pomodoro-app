import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
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
