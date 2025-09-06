import { HeaderMenu } from '@components/HeaderMenu/HeaderMenu';
import { t950, tBold, tXL } from '@styles/typography.module.css';
import { aiCenter, dFlex, jcBetween, jcCenter } from '@styles/utils.module.css';
import React, { useState } from 'react';
import { header, settingsButton, settingsIcon } from './Header.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${header} ${dFlex} ${jcBetween} ${aiCenter}`}>
      <h1 className={`${tXL} ${tBold} ${t950}`}>The Pomodoro Technique</h1>
      <button
        className={`${settingsButton} ${dFlex} ${aiCenter} ${jcCenter}`}
        onClick={toggleMenu}
        aria-label="Abrir configuración de sesiones">
        <img className={settingsIcon} src="/assets/settings.svg" alt="Configuración" />
      </button>

      <HeaderMenu isOpen={isMenuOpen} />
    </header>
  );
};
