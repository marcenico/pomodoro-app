import { useColorScheme } from '@hooks/useColorScheme';
import React, { useCallback } from 'react';
import { ghostIcon, knob, mobileButton, pillTrack, themeToggle } from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useColorScheme();

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  // Ícono actual (en la perilla del pill, o directamente en el botón mobile)
  const activeIcon = isDark ? '#moon' : '#sun';
  // Ícono del modo al que se cambiaría al hacer click
  const targetIcon = isDark ? '#sun' : '#moon';

  const handleClick = useCallback(() => toggleTheme(), [toggleTheme]);

  return (
    <>
      {/* Desktop (>= 768px): switch con perilla que muestra el modo activo */}
      <button
        type="button"
        className={`${themeToggle} d-flex ai-center jc-center`}
        onClick={handleClick}
        aria-pressed={isDark}
        aria-label={label}>
        <span className={pillTrack}>
          <span className={`${ghostIcon} d-flex ai-center jc-center`}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <use href={targetIcon} />
            </svg>
          </span>
          <span className={`${knob} d-flex ai-center jc-center`}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <use href={activeIcon} />
            </svg>
          </span>
        </span>
      </button>

      {/* Mobile (< 768px): botón de 44px con el ícono del modo destino */}
      <button
        type="button"
        className={`${mobileButton} d-flex ai-center jc-center`}
        onClick={handleClick}
        aria-pressed={isDark}
        aria-label={label}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <use href={targetIcon} />
        </svg>
      </button>
    </>
  );
};
