import React, { createContext, useContext } from 'react';

const TimerContext = createContext();

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext debe ser usado dentro de un TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children, isRunning = false }) => {
  const timerState = {
    isRunning
  };

  return <TimerContext.Provider value={timerState}>{children}</TimerContext.Provider>;
};
