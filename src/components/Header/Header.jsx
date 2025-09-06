import React, { useState } from 'react';
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

      {isMenuOpen && (
        <div className={styles.sessionsMenu}>
          <h2 className={styles.menuTitle}>Sessions settings</h2>
          <div className={styles.sessionsGrid}>
            <button className={styles.sessionOption}>
              <div className={styles.radioButton}></div>
              <div className={styles.sessionInfo}>
                <span className={styles.sessionName}>Light Focus</span>
                <span className={styles.sessionTimes}>15min 5min 10min</span>
              </div>
            </button>

            <button className={`${styles.sessionOption} ${styles.selected}`}>
              <div className={`${styles.radioButton} ${styles.selected}`}>
                <div className={styles.checkmark}></div>
              </div>
              <div className={styles.sessionInfo}>
                <span className={styles.sessionName}>Classic Pomodoro</span>
                <span className={styles.sessionTimes}>25min 5min 15min</span>
              </div>
            </button>

            <button className={styles.sessionOption}>
              <div className={styles.radioButton}></div>
              <div className={styles.sessionInfo}>
                <span className={styles.sessionName}>Deep Work</span>
                <span className={styles.sessionTimes}>40min 10min 20min</span>
              </div>
            </button>

            <button className={styles.sessionOption}>
              <div className={styles.radioButton}></div>
              <div className={styles.sessionInfo}>
                <span className={styles.sessionName}>Full Sprint</span>
                <span className={styles.sessionTimes}>60min 12min 25min</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
