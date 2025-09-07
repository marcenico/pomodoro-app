import React, { useEffect, useState } from 'react';
import {
  btn,
  btnReset,
  btnResetIcon,
  btnResetLeft,
  btnResetLeftExit,
  btnResetRight,
  btnResetRightExit,
  btnStart,
  btnStartIcon
} from './TimerControls.module.css';
import pauseIcon from '/assets/pause.svg';
import playIcon from '/assets/play.svg';
import refreshIcon from '/assets/refresh.svg';
import stopIcon from '/assets/stop.svg';

export const TimerControls = ({ startTimer, resetTimer, pauseTimer, stopTimer, isPaused, isRunning }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isRunning && !showButtons) {
      // Mostrar botones con animación
      setShowButtons(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    } else if (!isRunning && showButtons) {
      // Ocultar botones con animación
      setIsAnimating(true);
      setTimeout(() => {
        setShowButtons(false);
        setIsAnimating(false);
      }, 300);
    }
  }, [isRunning, showButtons]);

  return (
    <section className={`d-flex ai-center jc-center gap-24`}>
      {showButtons && (
        <button
          className={`d-flex ai-center jc-center t-600 ${btn} ${btnReset} ${
            isAnimating && isRunning ? btnResetLeft : ''
          } ${isAnimating && !isRunning ? btnResetLeftExit : ''}`}
          onClick={resetTimer}>
          <svg
            className={btnResetIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <use href={refreshIcon} />
          </svg>
        </button>
      )}
      <button
        className={`d-flex ai-center jc-center t-0 ${btn} ${btnStart}`}
        onClick={isPaused ? startTimer : pauseTimer}>
        <svg
          className={btnStartIcon}
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <use href={isPaused ? playIcon : pauseIcon} />
        </svg>
      </button>
      {showButtons && (
        <button
          className={`d-flex ai-center jc-center t-600 ${btn} ${btnReset} ${
            isAnimating && isRunning ? btnResetRight : ''
          } ${isAnimating && !isRunning ? btnResetRightExit : ''}`}
          onClick={stopTimer}>
          <svg
            className={btnResetIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <use href={stopIcon} />
          </svg>
        </button>
      )}
    </section>
  );
};
