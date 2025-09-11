import { Header } from '@components/Header/Header';
import { TabSelector } from '@components/TabSelector/TabSelector';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { TimerProvider } from '@contexts/TimerContext';
import { sessionOptions } from '@data/sessionOptions';
import { useAudio } from '@hooks/useAudio';
import { useThemeCSS } from '@hooks/useTheme';
import { useTimer } from '@hooks/useTimer';
import React, { useEffect, useState } from 'react';

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [selectedSession, setSelectedSession] = useState('classic-pomodoro');
  const [isAutoTransition, setIsAutoTransition] = useState(false);

  // Inicializar audio
  const { initAudio, playSessionCompleteSound } = useAudio();

  // Obtener la configuración de la sesión seleccionada
  const currentSession = sessionOptions.find((session) => session.id === selectedSession);
  const sessionConfig = currentSession ? currentSession.config : sessionOptions[1].config;

  // Convertir la configuración a formato de minutos y segundos
  const getTimerConfig = (tab) => {
    return sessionConfig[tab] || { minutes: 25, seconds: 0 };
  };

  const {
    changeCycle,
    currentCycle,
    isPaused,
    isRunning,
    pauseTimer,
    refreshTimer,
    resetTimer,
    startTimer,
    stopTimer,
    time
  } = useTimer({
    ...getTimerConfig(activeTab),
    pomodoroConfig: sessionConfig.pomodoro,
    shortBreakConfig: sessionConfig.shortBreak,
    longBreakConfig: sessionConfig.longBreak,
    playSessionCompleteSound
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

  // Aplicar tema CSS global
  useThemeCSS(currentCycle);

  // Inicializar audio automáticamente en desktop
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) initAudio(); // En desktop, inicializar audio automáticamente
  }, [initAudio]);

  const handleTabChange = (tabId) => {
    if (isRunning) return;
    setActiveTab(tabId);
    changeCycle(tabId);
  };
  const handleSessionChange = (sessionId) => setSelectedSession(sessionId);

  return (
    <TimerProvider isRunning={isRunning}>
      <Header
        sessionOptions={sessionOptions}
        selectedSession={selectedSession}
        isRunning={isRunning}
        onSessionChange={handleSessionChange}
      />
      <main className={`container p-16`}>
        <div className={`d-flex f-col gap-12 t-center`}>
          <TabSelector
            activeTab={activeTab}
            isRunning={isRunning}
            onTabChange={handleTabChange}
            currentCycle={currentCycle}
          />
          <Timer time={time} currentCycle={currentCycle} />
          <TimerControls
            isPaused={isPaused}
            isRunning={isRunning}
            pauseTimer={pauseTimer}
            refreshTimer={refreshTimer}
            resetTimer={resetTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            initAudio={initAudio}
          />
        </div>
      </main>
    </TimerProvider>
  );
};
