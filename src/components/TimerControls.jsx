import React from 'react';

export const TimerControls = ({ isPaused, pauseTimer, resetTimer, startTimer }) => {
  return (
    <section className="timer-controls">
      {/* Start button */}
      <button className="timer-controls__btn timer-controls__btn--start" onClick={isPaused ? startTimer : pauseTimer}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
      {/* Reset button */}
      <button className="timer-controls__btn timer-controls__btn--reset" onClick={resetTimer}>
        Reset
      </button>
    </section>
  );
};
