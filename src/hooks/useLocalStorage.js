import { useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  useEffect(() => {
    const data = loadFromLocalStorage();
    if (data === null || typeof data === 'undefined') {
      saveToLocalStorage(defaultValue);
    }
  }, [key, defaultValue]);

  return {
    storedValue: loadFromLocalStorage(),
    setValue: (value) => saveToLocalStorage(value)
  };
};
