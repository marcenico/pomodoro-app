import React from 'react';

export const TimerControls = ({ isPaused, pauseTimer, resetTimer, startTimer }) => {
  return (
    <section className="actions">
      {/* Start button */}
      <button className="actions__button actions__button--start" onClick={isPaused ? startTimer : pauseTimer}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
      {/* Reset button */}
      <button className="actions__button actions__button--reset" onClick={resetTimer}>
        Reset
      </button>
    </section>
  );
};
