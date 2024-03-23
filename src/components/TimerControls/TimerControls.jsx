import React from 'react';
import { container, btn, btnStart, btnReset } from './TimerControls.module.css';

export const TimerControls = ({ isPaused, pauseTimer, resetTimer, startTimer }) => {
  return (
    <section className={container}>
      {/* Start button */}
      <button className={`${btn} ${btnStart}`} onClick={isPaused ? startTimer : pauseTimer}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
      {/* Reset button */}
      <button className={`${btn} ${btnReset}`} onClick={resetTimer}>
        Reset
      </button>
    </section>
  );
};
