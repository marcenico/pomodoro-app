import { Header } from '@components/Header/Header';
import { TabSelector } from '@components/TabSelector/TabSelector';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { useTimer } from '@hooks/useTimer';
import React, { useState } from 'react';

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');

  // Configuración de tiempos para cada tipo de sesión
  const sessionConfig = {
    pomodoro: { minutes: 25, seconds: 0 },
    'short-break': { minutes: 5, seconds: 0 },
    'long-break': { minutes: 15, seconds: 0 }
  };

  const { isPaused, isRunning, pauseTimer, refreshTimer, resetTimer, startTimer, stopTimer, time } = useTimer(
    sessionConfig[activeTab]
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <Header />
      <main className={`container`}>
        <div className={`d-flex f-col gap-12 t-center`}>
          <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />
          <Timer time={time} />
          <TimerControls
            isPaused={isPaused}
            isRunning={isRunning}
            pauseTimer={pauseTimer}
            refreshTimer={refreshTimer}
            resetTimer={resetTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
        </div>
      </main>
    </>
  );
};
