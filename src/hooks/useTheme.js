import { useEffect } from 'react';

export const useThemeCSS = (currentCycle) => {
  const arrayColors = ['0', '50', '100', '200', '300', '500', '600', '950'];

  useEffect(() => {
    const root = document.documentElement;

    switch (currentCycle) {
      case 'longBreak':
        arrayColors.forEach((color) => {
          root.style.setProperty(`--color-${color}`, `var(--long-break-${color})`);
        });
        break;
      case 'shortBreak':
        arrayColors.forEach((color) => {
          root.style.setProperty(`--color-${color}`, `var(--short-break-${color})`);
        });
        break;
      default:
        arrayColors.forEach((color) => {
          root.style.setProperty(`--color-${color}`, `var(--pomodoro-${color})`);
        });
        break;
    }
  }, [currentCycle]);
};
