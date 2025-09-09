import React, { memo, useMemo } from 'react';
import { timer } from './Timer.module.css';

export const Timer = memo(({ time }) => {
  const { minutes, seconds } = time;

  // Memoizar el tiempo formateado para evitar recálculos innecesarios
  const formattedTime = useMemo(() => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [minutes, seconds]);

  return <div className={`t-bold t-600 ${timer}`}>{formattedTime}</div>;
});

Timer.displayName = 'Timer';
