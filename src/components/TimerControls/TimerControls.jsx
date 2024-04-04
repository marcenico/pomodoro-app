import React from 'react';
import { btn, btnReset, btnStart, container } from './TimerControls.module.css';

export const TimerControls = ({ startTimer, resetTimer, pauseTimer, isPaused }) => {
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
