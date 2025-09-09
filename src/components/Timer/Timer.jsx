import React from 'react';
import { timer } from './Timer.module.css';

export const Timer = ({ time }) => {
  const { minutes, seconds } = time;

  return (
    <div className={`t-bold t-600 ${timer}`}>{`${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`}</div>
  );
};
