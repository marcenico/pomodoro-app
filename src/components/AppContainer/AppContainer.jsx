import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { Timer } from '../Timer/Timer';
import { TimerControls } from '../TimerControls/TimerControls';

// #region CSS MODULES
import { textCenter } from '../../styles/utils.module.css';
import { container } from './AppContainer.module.css';
// #endregion

export const AppContainer = () => {
  const { time, isPaused, startTimer, pauseTimer, resetTimer } = useTimer({
    minutes: 25,
    seconds: 0
  });

  return (
    <main className={`${container} ${textCenter}`}>
      <h1>Técnica Pomodoro</h1>
      <Timer time={time} />
      <TimerControls isPaused={isPaused} pauseTimer={pauseTimer} resetTimer={resetTimer} startTimer={startTimer} />
    </main>
  );
};
