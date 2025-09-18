import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  btn,
  btnRefresh,
  btnRefreshIcon,
  btnRefreshLeft,
  btnRefreshLeftExit,
  btnRefreshRight,
  btnRefreshRightExit,
  btnStart,
  btnStartIcon
} from './TimerControls.module.css';

export const TimerControls = ({
  startTimer,
  resetTimer,
  pauseTimer,
  stopTimer,
  refreshTimer,
  isPaused,
  isRunning,
  initAudio
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoizar los handlers para evitar re-renders innecesarios
  const handleRefreshClick = useCallback(
    (e) => {
      refreshTimer();
      e.preventDefault();
    },
    [refreshTimer]
  );

  const handleStopClick = useCallback(
    (e) => {
      stopTimer();
      resetTimer();
      e.preventDefault();
    },
    [stopTimer, resetTimer]
  );

  const handleStartPauseClick = useCallback(() => {
    // Inicializar audio en el primer clic/tap solo en móviles (requerido para iOS)
    if (initAudio) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) initAudio();
    }

    if (isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [isPaused, startTimer, pauseTimer, initAudio]);

  // Memoizar las clases CSS para los botones de refresh
  const refreshButtonClasses = useMemo(() => {
    const baseClasses = `d-flex ai-center jc-center t-600 ${btn} ${btnRefresh}`;
    const animationClasses = isAnimating && isRunning ? btnRefreshLeft : '';
    const exitClasses = isAnimating && !isRunning ? btnRefreshLeftExit : '';

    return `${baseClasses} ${animationClasses} ${exitClasses}`.trim();
  }, [isAnimating, isRunning, btn, btnRefresh, btnRefreshLeft, btnRefreshLeftExit]);

  const refreshRightButtonClasses = useMemo(() => {
    const baseClasses = `d-flex ai-center jc-center t-600 ${btn} ${btnRefresh}`;
    const animationClasses = isAnimating && isRunning ? btnRefreshRight : '';
    const exitClasses = isAnimating && !isRunning ? btnRefreshRightExit : '';

    return `${baseClasses} ${animationClasses} ${exitClasses}`.trim();
  }, [isAnimating, isRunning, btn, btnRefresh, btnRefreshRight, btnRefreshRightExit]);

  useEffect(() => {
    console.log('isRunning', isRunning);
    if (isRunning) {
      // Mostrar botones con animación
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isRunning]);

  return (
    <section className={`d-flex ai-center jc-center gap-24`}>
      {isRunning && (
        <button className={refreshButtonClasses} onClick={handleRefreshClick}>
          <svg
            className={btnRefreshIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 12C2 14.3869 2.94821 16.6761 4.63604 18.364C6.32387 20.0518 8.61305 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C15.2704 17.5667 14.5107 18.0971 13.6679 18.4583C12.825 18.8196 11.917 19.0039 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 9.61305 19.0518 7.32387 17.364 5.63604C15.6761 3.94821 13.3869 3 11 3C8.61305 3 6.32387 3.94821 4.63604 5.63604C2.94821 7.32387 2 9.61305 2 12Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
      <button className={`d-flex ai-center jc-center t-0 ${btn} ${btnStart}`} onClick={handleStartPauseClick}>
        {isPaused ? (
          <svg
            className={btnStartIcon}
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M24 15.42V57.42L57 36.42L24 15.42Z" fill="currentColor" />
          </svg>
        ) : (
          <svg
            className={btnStartIcon}
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M42 57H54V15H42M18 57H30V15H18V57Z" fill="currentColor" />
          </svg>
        )}
      </button>
      {isRunning && (
        <button className={refreshRightButtonClasses} onClick={handleStopClick}>
          <svg
            className={btnRefreshIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18H6V6H18V18Z" fill="currentColor" />
          </svg>
        </button>
      )}
    </section>
  );
};
