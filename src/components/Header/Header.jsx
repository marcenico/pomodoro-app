import { HeaderMenu } from '@components/HeaderMenu/HeaderMenu';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { header, settingsButton, settingsIcon } from './Header.module.css';

export const Header = ({
  onSessionChange,
  onCustomSessionChange,
  customSessionConfig,
  selectedSession,
  sessionOptions,
  isRunning,
  autoStartSettings,
  onPomodoroToggle,
  onBreakToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  // Memoizar la función de toggle para evitar re-renders innecesarios
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Función para cerrar el menú
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Cerrar el menú cuando el timer esté corriendo
  useEffect(() => {
    if (isRunning && isMenuOpen) setIsMenuOpen(false);
  }, [isRunning, isMenuOpen]);

  return (
    <header className={`${header} d-flex jc-between ai-center`}>
      <h1 className="t-xl t-bold t-950">The Pomodoro Technique</h1>
      <button
        ref={buttonRef}
        className={`${settingsButton} d-flex ai-center jc-center`}
        onClick={toggleMenu}
        disabled={isRunning}
        aria-label="Abrir configuración de sesiones">
        <svg
          className={settingsIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5H7H3ZM21 5H11H21ZM3 12H15H3ZM21 12H19H21ZM3 19H5H3ZM21 19H9H21Z" fill="currentColor" />
          <path
            d="M3 5H7M21 5H11M3 12H15M21 12H19M3 19H5M21 19H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 7C10.1046 7 11 6.10457 11 5C11 3.89543 10.1046 3 9 3C7.89543 3 7 3.89543 7 5C7 6.10457 7.89543 7 9 7Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 21C8.10457 21 9 20.1046 9 19C9 17.8954 8.10457 17 7 17C5.89543 17 5 17.8954 5 19C5 20.1046 5.89543 21 7 21Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <HeaderMenu
        isOpen={isMenuOpen}
        sessionOptions={sessionOptions}
        selectedSession={selectedSession}
        onSessionChange={onSessionChange}
        onCustomSessionChange={onCustomSessionChange}
        customSessionConfig={customSessionConfig}
        autoStartSettings={autoStartSettings}
        onPomodoroToggle={onPomodoroToggle}
        onBreakToggle={onBreakToggle}
        isRunning={isRunning}
        onClose={closeMenu}
        buttonRef={buttonRef}
      />
    </header>
  );
};
