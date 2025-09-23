import { Header } from '@components/Header/Header';
import { TabSelector } from '@components/TabSelector/TabSelector';
import { Timer } from '@components/Timer/Timer';
import { TimerControls } from '@components/TimerControls/TimerControls';
import { TimerProvider } from '@contexts/TimerContext';
import { sessionOptions } from '@data/sessionOptions';
import { useAppSettings } from '@hooks/useAppSettings';
import { useAudio } from '@hooks/useAudio';
import { useDocumentTitle } from '@hooks/useDocumentTitle';
import { useThemeCSS } from '@hooks/useTheme';
import { useTimer } from '@hooks/useTimer';
import React, { useEffect, useState } from 'react';

export const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');

  // Usar el hook de configuración de la aplicación
  const { selectedSession, customSessionConfig, handleSessionChange, handleCustomSessionChange } = useAppSettings();

  // Inicializar audio
  const { initAudio, playSessionCompleteSound } = useAudio();

  // Obtener la configuración de la sesión seleccionada
  const currentSession = sessionOptions.find((session) => session.id === selectedSession);
  const sessionConfig =
    selectedSession === 'custom'
      ? customSessionConfig
      : currentSession
      ? currentSession.config
      : sessionOptions[1].config;

  // Convertir la configuración a formato de minutos y segundos
  const getTimerConfig = (tab) => {
    return sessionConfig[tab] || { minutes: 25, seconds: 0 };
  };

  const {
    autoStartSettings,
    changeCycle,
    currentCycle,
    isPaused,
    isRunning,
    pauseTimer,
    refreshTimer,
    resetTimer,
    startTimer,
    stopTimer,
    time,
    toggleBreakAutoStart,
    togglePomodoroAutoStart
  } = useTimer({
    ...getTimerConfig(activeTab),
    pomodoroConfig: sessionConfig.pomodoro,
    shortBreakConfig: sessionConfig.shortBreak,
    longBreakConfig: sessionConfig.longBreak,
    playSessionCompleteSound
  });

  // Sincronizar el tab activo con el ciclo actual del timer automáticamente
  useEffect(() => {
    if (currentCycle && currentCycle !== activeTab) {
      setActiveTab(currentCycle);
    }
  }, [currentCycle, activeTab]);

  // Aplicar tema CSS global
  useThemeCSS(currentCycle);

  // Actualizar el título del documento con el tiempo del timer
  useDocumentTitle(time, currentCycle, isRunning, isPaused);

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

  return (
    <TimerProvider isRunning={isRunning}>
      <Header
        autoStartSettings={autoStartSettings}
        customSessionConfig={customSessionConfig}
        isRunning={isRunning}
        onBreakToggle={toggleBreakAutoStart}
        onCustomSessionChange={handleCustomSessionChange}
        onPomodoroToggle={togglePomodoroAutoStart}
        onSessionChange={handleSessionChange}
        selectedSession={selectedSession}
        sessionOptions={sessionOptions}
      />
      <main className={`container p-16`}>
        <div className={`d-flex f-col gap-12 t-center`}>
          <TabSelector
            activeTab={activeTab}
            currentCycle={currentCycle}
            isRunning={isRunning}
            onTabChange={handleTabChange}
          />
          <Timer currentCycle={currentCycle} time={time} />
          <TimerControls
            initAudio={initAudio}
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
    </TimerProvider>
  );
};
