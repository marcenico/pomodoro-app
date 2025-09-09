import { HeaderMenu } from '@components/HeaderMenu/HeaderMenu';
import React, { useState } from 'react';
import { header, settingsButton, settingsIcon } from './Header.module.css';

export const Header = ({ onSessionChange, selectedSession, sessionOptions, isRunning }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`${header} d-flex jc-between ai-center`}>
      <h1 className="t-xl t-bold t-950">The Pomodoro Technique</h1>
      <button
        className={`${settingsButton} d-flex ai-center jc-center`}
        onClick={toggleMenu}
        disabled={isRunning}
        aria-label="Abrir configuración de sesiones">
        <svg
          className={settingsIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <use href={`assets/settings.svg`} />
        </svg>
      </button>
      <HeaderMenu
        isOpen={isMenuOpen}
        sessionOptions={sessionOptions}
        selectedSession={selectedSession}
        onSessionChange={onSessionChange}
      />
    </header>
  );
};
