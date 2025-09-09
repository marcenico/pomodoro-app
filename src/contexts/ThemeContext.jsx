import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, currentCycle }) => {
  const isBreakMode = currentCycle === 'shortBreak' || currentCycle === 'longBreak';

  const theme = {
    isBreakMode,
    colors: {
      primary: isBreakMode ? 'green' : 'blue',
      background: isBreakMode ? 'var(--green-0)' : 'var(--blue-0)',
      text: isBreakMode ? 'var(--green-950)' : 'var(--blue-950)',
      textSecondary: isBreakMode ? 'var(--green-600)' : 'var(--blue-600)',
      accent: isBreakMode ? 'var(--green-500)' : 'var(--blue-500)',
      accentHover: isBreakMode ? 'var(--green-600)' : 'var(--blue-600)',
      light: isBreakMode ? 'var(--green-50)' : 'var(--blue-50)',
      lightHover: isBreakMode ? 'var(--green-100)' : 'var(--blue-100)',
      border: isBreakMode ? 'var(--green-50)' : 'var(--blue-50)'
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
