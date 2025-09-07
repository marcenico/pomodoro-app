import { Header } from '@components/Header/Header';
import { TabSelector } from '@components/TabSelector/TabSelector';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { useTimer } from '@hooks/useTimer';
import React, { useState } from 'react';

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [selectedSession, setSelectedSession] = useState('classic-pomodoro');

  // Configuración de sesiones disponibles
  const sessionOptions = [
    {
      id: 'light-focus',
      name: 'Light Focus',
      times: '15min 5min 10min',
      config: { pomodoro: 15, shortBreak: 5, longBreak: 10 }
    },
    {
      id: 'classic-pomodoro',
      name: 'Classic Pomodoro',
      times: '25min 5min 15min',
      config: { pomodoro: 25, shortBreak: 5, longBreak: 15 }
    },
    {
      id: 'deep-work',
      name: 'Deep Work',
      times: '40min 10min 20min',
      config: { pomodoro: 40, shortBreak: 10, longBreak: 20 }
    },
    {
      id: 'full-sprint',
      name: 'Full Sprint',
      times: '60min 12min 25min',
      config: { pomodoro: 60, shortBreak: 12, longBreak: 25 }
    }
  ];

  // Obtener la configuración de la sesión seleccionada
  const currentSession = sessionOptions.find((session) => session.id === selectedSession);
  const sessionConfig = currentSession ? currentSession.config : sessionOptions[1].config;

  // Convertir la configuración a formato de minutos y segundos
  const getTimerConfig = (tab) => {
    const minutes = sessionConfig[tab] || 25;
    return { minutes, seconds: 0 };
  };

  const { isPaused, isRunning, pauseTimer, refreshTimer, resetTimer, startTimer, stopTimer, time } = useTimer(
    getTimerConfig(activeTab)
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSessionChange = (sessionId) => {
    setSelectedSession(sessionId);
  };

  return (
    <>
      <Header sessionOptions={sessionOptions} selectedSession={selectedSession} onSessionChange={handleSessionChange} />
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
