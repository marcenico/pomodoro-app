import React, { useState } from 'react';
import { HeaderMenu } from '@components/HeaderMenu/HeaderMenu';
import styles from './Header.module.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerCard}>
        <h1 className={styles.title}>The Pomodoro Technique</h1>
        <button className={styles.settingsButton} onClick={toggleMenu} aria-label="Abrir configuración de sesiones">
          <div className={styles.settingsIcon}>
            <div className={styles.settingsLine}></div>
            <div className={styles.settingsLine}></div>
            <div className={styles.settingsLine}></div>
          </div>
        </button>
      </div>

      <HeaderMenu isOpen={isMenuOpen} />
    </header>
  );
};
