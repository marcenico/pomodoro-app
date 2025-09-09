import { useEffect } from 'react';

export const useThemeCSS = (currentCycle) => {
  useEffect(() => {
    const root = document.documentElement;

    if (currentCycle === 'longBreak') {
      // Verde más oscuro para descanso largo
      root.style.setProperty('--theme-bg', 'var(--dark-green-0)');
      root.style.setProperty('--theme-text', 'var(--dark-green-950)');
      root.style.setProperty('--theme-text-secondary', 'var(--dark-green-600)');
      root.style.setProperty('--theme-accent', 'var(--dark-green-500)');
      root.style.setProperty('--theme-accent-hover', 'var(--dark-green-600)');
      root.style.setProperty('--theme-light', 'var(--dark-green-50)');
      root.style.setProperty('--theme-light-hover', 'var(--dark-green-100)');
      root.style.setProperty('--theme-border', 'var(--dark-green-50)');
    } else if (currentCycle === 'shortBreak') {
      // Verde normal para descanso corto
      root.style.setProperty('--theme-bg', 'var(--green-0)');
      root.style.setProperty('--theme-text', 'var(--green-950)');
      root.style.setProperty('--theme-text-secondary', 'var(--green-600)');
      root.style.setProperty('--theme-accent', 'var(--green-500)');
      root.style.setProperty('--theme-accent-hover', 'var(--green-600)');
      root.style.setProperty('--theme-light', 'var(--green-50)');
      root.style.setProperty('--theme-light-hover', 'var(--green-100)');
      root.style.setProperty('--theme-border', 'var(--green-50)');
    } else {
      // Azul para pomodoro
      root.style.setProperty('--theme-bg', 'var(--blue-0)');
      root.style.setProperty('--theme-text', 'var(--blue-950)');
      root.style.setProperty('--theme-text-secondary', 'var(--blue-600)');
      root.style.setProperty('--theme-accent', 'var(--blue-500)');
      root.style.setProperty('--theme-accent-hover', 'var(--blue-600)');
      root.style.setProperty('--theme-light', 'var(--blue-50)');
      root.style.setProperty('--theme-light-hover', 'var(--blue-100)');
      root.style.setProperty('--theme-border', 'var(--blue-50)');
    }
  }, [currentCycle]);
};
