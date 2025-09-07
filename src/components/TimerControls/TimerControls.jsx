import React from 'react';
import { btn, btnReset, btnResetIcon, btnStart, btnStartIcon } from './TimerControls.module.css';
import pauseIcon from '/assets/pause.svg';
import playIcon from '/assets/play.svg';
import refreshIcon from '/assets/refresh.svg';
import stopIcon from '/assets/stop.svg';

export const TimerControls = ({ startTimer, resetTimer, pauseTimer, stopTimer, isPaused, isRunning }) => {
  return (
    <section className={`d-flex ai-center jc-center gap-24`}>
      {isRunning && (
        <button className={`d-flex ai-center jc-center t-600 ${btn} ${btnReset}`} onClick={resetTimer}>
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
      {isRunning && (
        <button className={`d-flex ai-center jc-center t-600 ${btn} ${btnReset}`} onClick={stopTimer}>
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
