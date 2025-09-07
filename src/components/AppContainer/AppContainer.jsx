import { Header } from '@components/Header/Header';
import { TabSelector } from '@components/TabSelector/TabSelector';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { sessionOptions } from '@data/sessionOptions';
import { useTimer } from '@hooks/useTimer';
import React, { useState, useEffect } from 'react';

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [selectedSession, setSelectedSession] = useState('classic-pomodoro');
  const [isAutoTransition, setIsAutoTransition] = useState(false);

  // Obtener la configuración de la sesión seleccionada
  const currentSession = sessionOptions.find((session) => session.id === selectedSession);
  const sessionConfig = currentSession ? currentSession.config : sessionOptions[1].config;

  // Convertir la configuración a formato de minutos y segundos
  const getTimerConfig = (tab) => {
    return sessionConfig[tab] || { minutes: 25, seconds: 0 };
  };

  const {
    isPaused,
    isRunning,
    pauseTimer,
    refreshTimer,
    resetTimer,
    startTimer,
    stopTimer,
    time,
    currentCycle,
    completedPomodoros
  } = useTimer({
    ...getTimerConfig(activeTab),
    pomodoroTime: sessionConfig.pomodoro.minutes,
    shortBreakTime: sessionConfig.shortBreak.minutes,
    longBreakTime: sessionConfig.longBreak.minutes
  });

  // Sincronizar el tab activo con el ciclo actual del timer solo en transiciones automáticas
  useEffect(() => {
    if (isAutoTransition && currentCycle && currentCycle !== activeTab) {
      setActiveTab(currentCycle);
      setIsAutoTransition(false);
    }
  }, [currentCycle, activeTab, isAutoTransition]);

  // Detectar cuando el timer hace una transición automática
  useEffect(() => {
    if (currentCycle) {
      setIsAutoTransition(true);
    }
  }, [currentCycle]);

  const handleTabChange = (tabId) => setActiveTab(tabId);
  const handleSessionChange = (sessionId) => setSelectedSession(sessionId);

  return (
    <>
      <Header sessionOptions={sessionOptions} selectedSession={selectedSession} onSessionChange={handleSessionChange} />
      <main className={`container p-16`}>
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
