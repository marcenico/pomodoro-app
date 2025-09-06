import { Header } from '@components/Header/Header';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { useTimer } from '@hooks/useTimer';
import React from 'react';

// #region CSS MODULES
// #endregion

export const AppContainer = () => {
  const { time, isPaused, startTimer, pauseTimer, resetTimer } = useTimer({
    minutes: 25,
    seconds: 0
  });

  return (
    <>
      <Header />
      <main className={`container t-center`}>
        <Timer time={time} />
        <TimerControls isPaused={isPaused} pauseTimer={pauseTimer} resetTimer={resetTimer} startTimer={startTimer} />
      </main>
    </>
  );
};
